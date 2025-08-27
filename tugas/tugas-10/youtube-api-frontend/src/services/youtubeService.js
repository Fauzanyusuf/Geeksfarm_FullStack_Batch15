// src/services/youtubeService.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: API_KEY },
});

export function extractVideoId(video) {
  if (!video) return "";
  return typeof video === "string"
    ? video
    : video?.id?.videoId || video?.id || "";
}

function uniqueVideos(results, excludeId) {
  const seen = new Set();
  return results.filter((item) => {
    const vid = extractVideoId(item);
    if (!vid || vid === excludeId || seen.has(vid)) return false;
    seen.add(vid);
    return true;
  });
}

export async function searchVideos(query, maxResults = 10) {
  try {
    const { data } = await apiClient.get("/search", {
      params: { part: "snippet", q: query, type: "video", maxResults },
    });
    return data.items || [];
  } catch (err) {
    console.error(
      "Error fetching search results:",
      err.response?.data || err.message
    );
    throw err;
  }
}

async function getVideoMetadata(videoId) {
  const { data } = await apiClient.get("/videos", {
    params: { part: "snippet,topicDetails", id: videoId },
  });
  return data.items?.[0] || null;
}

async function getVideosByCategory(categoryId, maxResults) {
  if (!categoryId) return [];
  const { data } = await apiClient.get("/search", {
    params: {
      part: "snippet",
      type: "video",
      videoCategoryId: categoryId,
      maxResults,
    },
  });
  return data.items || [];
}

async function getVideosByTopic(topicId, maxResults) {
  if (!topicId) return [];
  const { data } = await apiClient.get("/search", {
    params: { part: "snippet", type: "video", topicId, maxResults },
  });
  return data.items || [];
}

async function getVideosByQuery(query, maxResults) {
  if (!query) return [];
  const { data } = await apiClient.get("/search", {
    params: { part: "snippet", type: "video", q: query, maxResults },
  });
  return data.items || [];
}

export async function getRelatedVideos(videoId, maxResults = 10) {
  try {
    const id = extractVideoId(videoId);
    if (!id) throw new Error("Invalid videoId");

    const metadata = await getVideoMetadata(id);
    if (!metadata) return [];

    const { categoryId, title } = metadata.snippet;
    const topics = metadata.topicDetails?.relevantTopicIds || [];

    const [byCategory, byTopic, byQuery] = await Promise.all([
      getVideosByCategory(categoryId, maxResults),
      getVideosByTopic(topics[0], maxResults),
      getVideosByQuery(title, maxResults),
    ]);

    const combined = [...byCategory, ...byTopic, ...byQuery];
    return uniqueVideos(combined, id).slice(0, maxResults);
  } catch (err) {
    console.error(
      "Error fetching related videos:",
      err.response?.data || err.message
    );
    throw err;
  }
}

export async function getTrendingVideos(regionCode = "ID", maxResults = 10) {
  try {
    const { data } = await apiClient.get("/videos", {
      params: { part: "snippet", chart: "mostPopular", regionCode, maxResults },
    });
    return data.items || [];
  } catch (err) {
    console.error(
      "Error fetching trending videos:",
      err.response?.data || err.message
    );
    throw err;
  }
}
