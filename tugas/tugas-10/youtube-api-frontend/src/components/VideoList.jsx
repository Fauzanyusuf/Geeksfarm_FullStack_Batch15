import { Component } from "react";
import { extractVideoId } from "../services/youtubeService";

class VideoList extends Component {
  render() {
    const { videos, onSelect } = this.props;

    return (
      <div className="flex flex-col gap-4">
        {videos.map((video) => {
          const vid = extractVideoId(video);
          return (
            <div
              key={vid}
              onClick={() => onSelect(video)}
              className="flex gap-3 items-start cursor-pointer hover:bg-gray-100 p-2 rounded-xl transition group"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-40 h-24 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              />
              <div className="flex-1">
                <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-red-600 transition">
                  {video.snippet.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {video.snippet.channelTitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default VideoList;
