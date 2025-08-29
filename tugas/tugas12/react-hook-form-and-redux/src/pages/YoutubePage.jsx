/* eslint-disable react-hooks/exhaustive-deps */
// Import React hooks dan komponen serta service Youtube
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  searchVideos, // Fungsi untuk mencari video berdasarkan query
  getRelatedVideos, // Fungsi untuk mendapatkan video terkait
  getTrendingVideos, // Fungsi untuk mendapatkan video trending
  extractVideoId, // Utility untuk mengambil videoId
  preloadTrendingVideos, // Preload trending agar lebih cepat
} from "../services/youtubeService";
import VideoPlayer from "../components/VideoPlayer";
import VideoList from "../components/VideoList";

// Komponen utama YoutubeApp
export default function YoutubeApp() {
  // State untuk query pencarian
  const [query, setQuery] = useState("");
  // State untuk daftar video yang ditampilkan
  const [videos, setVideos] = useState([]);
  // State untuk video yang sedang diputar
  const [currentVideo, setCurrentVideo] = useState(null);
  // State untuk daftar video terkait
  const [relatedVideos, setRelatedVideos] = useState([]);
  // State untuk tab aktif (recommended/search)
  const [activeTab, setActiveTab] = useState("recommended");
  // State untuk menandai apakah user sudah melakukan pencarian
  const [hasSearched, setHasSearched] = useState(false);
  // State loading utama
  const [isLoading, setIsLoading] = useState(false);
  // State loading untuk video terkait
  const [isLoadingRelated, setIsLoadingRelated] = useState(false);

  // Saat komponen mount, load video trending dan preload trending
  useEffect(() => {
    loadTrending();
    preloadTrendingVideos();
  }, []);

  // Fungsi untuk mengambil video trending dari API
  const loadTrending = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getTrendingVideos("ID", 12);
      setVideos(res);
    } catch (err) {
      console.error("Failed to load trending videos:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fungsi untuk mengambil video terkait dari API
  const loadRelated = useCallback(async (video) => {
    if (!video) return;

    try {
      setIsLoadingRelated(true);
      const id = extractVideoId(video);
      const res = await getRelatedVideos(id, 8);
      setRelatedVideos(res);
    } catch (err) {
      console.error("Failed to load related videos:", err);
    } finally {
      setIsLoadingRelated(false);
    }
  }, []);

  // Jika currentVideo berubah, ambil video terkait
  useEffect(() => {
    if (currentVideo) {
      loadRelated(currentVideo);
    }
  }, [currentVideo, loadRelated]);

  // Handler untuk pencarian video
  const handleSearch = useCallback(
    async (e) => {
      e.preventDefault();
      if (!query.trim()) return;

      try {
        setIsLoading(true);
        const res = await searchVideos(query.trim(), 12);
        setVideos(res);
        setHasSearched(true);
        setActiveTab("search");
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [query]
  );

  // Utility untuk styling tab aktif/inaktif
  const getTabClass = useCallback(
    (tab) => {
      const base = "flex-1 py-2 text-sm font-medium relative";
      const active =
        "text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-600";
      const inactive = "text-gray-500 hover:text-gray-700";
      return `${base} ${activeTab === tab ? active : inactive}`;
    },
    [activeTab]
  );

  // Handler untuk memilih video yang akan diputar
  const handleVideoSelect = useCallback((video) => {
    setCurrentVideo(video);
  }, []);

  // Grid untuk menampilkan daftar video (trending/search)
  const exploreGrid = useMemo(() => {
    if (isLoading) {
      // Loading spinner
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      );
    }

    // Tampilkan daftar video dalam grid
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => {
          const vid = extractVideoId(video);
          return (
            <div
              key={vid}
              onClick={() => handleVideoSelect(video)}
              className="cursor-pointer group"
            >
              <div className="relative overflow-hidden rounded-xl shadow-sm group-hover:shadow-lg transition">
                <img
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-red-600 transition">
                {video.snippet.title}
              </h3>
              <p className="text-xs text-gray-500">
                {video.snippet.channelTitle}
              </p>
            </div>
          );
        })}
      </div>
    );
  }, [videos, isLoading, handleVideoSelect]);

  // Render tampilan explore (trending/search)
  function renderExplore() {
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {hasSearched && activeTab === "search"
              ? "Search Results"
              : "Explore"}
          </h2>
          {hasSearched && (
            <button
              onClick={() => {
                setActiveTab("recommended");
                setHasSearched(false);
                loadTrending();
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Back to Trending
            </button>
          )}
        </div>
        {exploreGrid}
      </div>
    );
  }

  // Render layout player dan sidebar video terkait/search
  function renderPlayerLayout() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Player utama */}
        <div className="md:col-span-8">
          <VideoPlayer video={currentVideo} />
        </div>

        {/* Sidebar video terkait/search */}
        <aside className="md:col-span-4">
          <div className="flex border-b mb-4">
            {hasSearched && (
              <button
                onClick={() => setActiveTab("search")}
                className={getTabClass("search")}
              >
                Search Results
              </button>
            )}
            <button
              onClick={() => setActiveTab("recommended")}
              className={getTabClass("recommended")}
            >
              Recommended
            </button>
          </div>

          {isLoadingRelated ? (
            // Loading spinner untuk video terkait
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : (
            <>
              {activeTab === "search" && hasSearched ? (
                <VideoList videos={videos} onSelect={handleVideoSelect} />
              ) : (
                <VideoList
                  videos={relatedVideos}
                  onSelect={handleVideoSelect}
                />
              )}
            </>
          )}
        </aside>
      </div>
    );
  }

  // Render utama halaman Youtube
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header dan form pencarian */}
      <header className="mb-6">
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-2 bg-white rounded-full shadow px-4 py-2 border border-gray-200"
        >
          {/* Icon search */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 
              0 1110.89 3.476l4.817 4.817a1 1 0 
              01-1.414 1.414l-4.816-4.816A6 6 
              0 012 8z"
              clipRule="evenodd"
            />
          </svg>
          {/* Input pencarian */}
          <input
            type="text"
            placeholder="Search videos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700"
          />
          {/* Tombol search */}
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition disabled:opacity-50"
          >
            {isLoading ? "..." : "Search"}
          </button>
        </form>
      </header>

      {/* Tampilkan player atau explore sesuai state */}
      {currentVideo ? renderPlayerLayout() : renderExplore()}
    </div>
  );
}
