import { Component } from "react";

class VideoPlayer extends Component {
  state = {
    expanded: false,
  };

  toggleExpand = () => {
    this.setState((prev) => ({ expanded: !prev.expanded }));
  };

  render() {
    const { video } = this.props;
    const { expanded } = this.state;

    if (!video) return null;

    const videoId = video.id?.videoId || video.id;
    const { title, description, channelTitle } = video.snippet;

    return (
      <div>
        <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        <div className="mt-4 border-b pb-3">
          <h1 className="text-2xl font-bold mb-1 text-gray-900">{title}</h1>
          <p className="text-sm text-gray-600">{channelTitle}</p>
        </div>

        <div className="mt-3">
          <p
            className={`text-sm text-gray-700 whitespace-pre-line ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {description}
          </p>
          {description.length > 150 && (
            <button
              onClick={this.toggleExpand}
              className="mt-1 text-sm text-blue-600 hover:underline"
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
