import { Component } from "react";
import {
  searchVideos,
  getRelatedVideos,
  getTrendingVideos,
  extractVideoId,
} from "./services/youtubeService";
import VideoPlayer from "./components/VideoPlayer";
import VideoList from "./components/VideoList";

class App extends Component {
  state = {
    query: "",
    videos: [],
    currentVideo: null,
    relatedVideos: [],
    activeTab: "recommended",
    hasSearched: false,
    loading: false,
    error: null,
  };

  async componentDidMount() {
    await this.loadTrending();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.currentVideo !== prevState.currentVideo) {
      await this.loadRelated(this.state.currentVideo);
    }
  }

  loadTrending = async () => {
    this.setState({ loading: true, error: null });
    try {
      const res = await getTrendingVideos("ID", 12);
      this.setState({ videos: res, loading: false });
    } catch (err) {
      this.setState({
        error: "Failed to load trending videos",
        loading: false,
      });
      console.error(err);
    }
  };

  loadRelated = async (video) => {
    if (!video) return;
    this.setState({ loading: true, error: null });
    try {
      const id = extractVideoId(video);
      const res = await getRelatedVideos(id, 10);
      this.setState({ relatedVideos: res, loading: false });
    } catch (err) {
      this.setState({ error: "Failed to load related videos", loading: false });
      console.error(err);
    }
  };

  handleSearch = async (e) => {
    e.preventDefault();
    if (!this.state.query) return;

    this.setState({ loading: true, error: null });
    try {
      const res = await searchVideos(this.state.query, 12);
      this.setState({
        videos: res,
        hasSearched: true,
        activeTab: "search",
        loading: false,
      });
    } catch (err) {
      this.setState({ error: "Search failed", loading: false });
      console.error(err);
    }
  };

  getTabClass = (tab) => {
    const base = "flex-1 py-2 text-sm font-medium relative";
    const active =
      "text-red-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-600";
    const inactive = "text-gray-500 hover:text-gray-700";
    return `${base} ${this.state.activeTab === tab ? active : inactive}`;
  };

  renderExplore() {
    const { videos } = this.state;
    return (
      <div>
        <h2 className="text-lg font-semibold mb-4">Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((video) => {
            const vid = extractVideoId(video);
            return (
              <div
                key={vid}
                onClick={() => this.setState({ currentVideo: video })}
                className="cursor-pointer group"
              >
                <div className="relative overflow-hidden rounded-xl shadow-sm group-hover:shadow-lg transition">
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
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
      </div>
    );
  }

  renderPlayerLayout() {
    const { currentVideo, activeTab, hasSearched, videos, relatedVideos } =
      this.state;

    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <VideoPlayer video={currentVideo} />
        </div>
        <aside className="md:col-span-4">
          <div className="flex border-b mb-4">
            {hasSearched && (
              <button
                onClick={() => this.setState({ activeTab: "search" })}
                className={this.getTabClass("search")}
              >
                Search Results
              </button>
            )}
            <button
              onClick={() => this.setState({ activeTab: "recommended" })}
              className={this.getTabClass("recommended")}
            >
              Recommended
            </button>
          </div>
          {activeTab === "search" && hasSearched ? (
            <VideoList
              videos={videos}
              onSelect={(v) => this.setState({ currentVideo: v })}
            />
          ) : (
            <VideoList
              videos={relatedVideos}
              onSelect={(v) => this.setState({ currentVideo: v })}
            />
          )}
        </aside>
      </div>
    );
  }

  render() {
    const { query, currentVideo, loading, error } = this.state;

    return (
      <div className="min-h-dvh bg-gray-50 p-6">
        <header className="mb-6">
          <div className="w-full flex justify-center mb-6">
            <a href="/" className="block">
              <h1 className="text-2xl font-bold bg-red-600 text-white rounded-lg px-6 py-3 shadow text-center">
                Youtube API
              </h1>
            </a>
          </div>
          <form
            onSubmit={this.handleSearch}
            className="flex items-center gap-2 bg-white rounded-full shadow px-4 py-2 border border-gray-200"
          >
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
            <input
              type="text"
              placeholder="Search videos..."
              value={query}
              onChange={(e) => this.setState({ query: e.target.value })}
              className="flex-1 bg-transparent outline-none text-gray-700"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition cursor-pointer"
            >
              Search
            </button>
          </form>
        </header>

        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {currentVideo ? this.renderPlayerLayout() : this.renderExplore()}
      </div>
    );
  }
}

export default App;
