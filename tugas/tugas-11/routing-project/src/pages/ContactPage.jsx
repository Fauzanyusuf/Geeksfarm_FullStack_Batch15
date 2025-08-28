const profil = {
  img: "/foto.jpg",
  name: "Fauzan Yusuf",
  occupation: "JavaScript Fullstack Student",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non sunt itaque impedit cupiditate alias, aspernatur sapiente excepturi numquam quasi, nulla ut quae voluptatum laudantium vel asperiores eveniet omnis, doloremque nostrum.",
};

export default function ContactPage() {
  return (
    <div className="min-h-[calc(100dvh-64px)] flex items-center justify-center bg-zinc-100 p-4">
      <div className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg w-full max-w-md mx-auto">
        <div className="m-3 overflow-hidden rounded-md h-80  flex justify-center items-center">
          <img
            className="w-full h-full object-cover "
            src={profil.img}
            alt={profil.name}
          />
        </div>
        <div className="p-6 text-center">
          <h4 className="mb-2 text-xl font-semibold text-slate-800">
            {profil.name}
          </h4>
          <p className="text-sm font-semibold text-slate-500 uppercase">
            {profil.occupation}
          </p>
          <p className="text-base text-slate-600 mt-4 font-light text-justify">
            {profil.description}
          </p>
        </div>
      </div>
    </div>
  );
}
