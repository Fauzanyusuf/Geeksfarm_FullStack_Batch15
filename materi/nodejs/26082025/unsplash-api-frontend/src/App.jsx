import { useState } from "react";
import { searchImages } from "./services/unsplashService";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");

  console.log(query, images);

  return (
    <>
      <Jumbotron>
        <SearchInput setImages={setImages} setQuery={setQuery} />
      </Jumbotron>
      <Images images={images} query={query} />
    </>
  );
}

function Jumbotron(props) {
  const { children } = props;
  return (
    <div className="flex items-center py-5 ">
      <div className="w-full max-w-md mx-auto ">
        <h1 className="text-2xl font-semibold text-center">Find Images</h1>
        <>{children}</>
      </div>
    </div>
  );
}

function SearchInput({ setImages, setQuery }) {
  const [search, setSearch] = useState("");

  function handleInputChange(e) {
    setSearch(e.target.value);
  }

  async function handleSearch(e) {
    e.preventDefault();
    try {
      const data = await searchImages(search);
      setImages(data.results);
      setQuery(search);
    } catch (err) {
      console.error("Failed to fetch images: ", err);
      alert("Failed to fetch images. Please try again.");
    }
    setSearch("");
  }

  return (
    <form onSubmit={handleSearch} className="flex mt-4">
      <input
        className="bg-gray-50 border border-gray-300 text-sm w-full indent-2 p-2.5 outline-none focus:border-blue-500 focus:ring rounded-l-2xl"
        type="search"
        placeholder="Search Image"
        value={search}
        onChange={handleInputChange}
      />
      <button
        disabled={!search}
        className="px-4 text-white transition bg-gray-700 cursor-pointer rounded-r-2xl focus:ring-2 focus:ring-blue-300 disabled:bg-gray-500 disabled:cursor-no-drop"
      >
        Search
      </button>
    </form>
  );
}

function Images({ images, query }) {
  return (
    <>
      {query && (
        <h1 className="mt-6 text-2xl text-center underline">
          Result for: {query}
        </h1>
      )}
      <div className="grid items-stretch gap-4 px-8 mx-auto my-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-11/12">
        {images.map((img) => (
          <a
            href={img.urls.regular}
            target="_blank"
            rel="noopener noreferrer"
            key={img.id}
          >
            <div className="flex flex-col h-full overflow-hidden rounded shadow-xl/20">
              <img
                src={img.urls.small}
                alt={img.alt_description}
                className="object-cover w-full h-80"
              />
              <div className="flex flex-col justify-start flex-1 p-4 bg-white">
                <div className="font-semibold">
                  {img.user?.name || "Unknown"}
                </div>
                <div className="text-sm text-gray-600">
                  {img.alt_description || "No description"}
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
