// Import axios untuk melakukan HTTP request
import axios from "axios";

// Ambil API key dari environment variable
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

// Buat instance axios dengan baseURL dan parameter API key
const apiClient = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: { key: API_KEY },
});

// Cache untuk menyimpan hasil request agar tidak terlalu sering memanggil API
const cache = new Map();
// Durasi cache aktif (5 menit)
const CACHE_DURATION = 5 * 60 * 1000;

// Mengecek apakah cache masih valid berdasarkan timestamp
function isCacheValid(timestamp) {
  return Date.now() - timestamp < CACHE_DURATION;
}

// Mengambil data dari cache jika valid, jika tidak fetch dari API dan simpan ke cache
async function getCachedOrFetch(cacheKey, fetchFn) {
  const cached = cache.get(cacheKey);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data;
  }

  try {
    const data = await fetchFn();
    cache.set(cacheKey, {
      data,
      timestamp: Date.now(),
    });
    return data;
  } catch (error) {
    // Jika API error, gunakan cache yang sudah expired jika ada
    if (cached) {
      console.warn("Using expired cache due to API error:", error);
      return cached.data;
    }
    throw error;
  }
}

// Mengambil videoId dari objek video (bisa string atau object)
export function extractVideoId(video) {
  if (!video) return "";
  return typeof video === "string"
    ? video
    : video?.id?.videoId || video?.id || "";
}

// Menghilangkan duplikasi video berdasarkan videoId dan meng-exclude id tertentu
function uniqueVideos(results, excludeId) {
  const seen = new Set();
  return results.filter((item) => {
    const vid = extractVideoId(item);
    if (!vid || vid === excludeId || seen.has(vid)) return false;
    seen.add(vid);
    return true;
  });
}

// Debounce pencarian agar tidak terlalu sering request ke API
let searchTimeout;
export async function searchVideos(query, maxResults = 10) {
  return new Promise((resolve, reject) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(async () => {
      const cacheKey = `search_${query}_${maxResults}`;

      try {
        // Ambil hasil pencarian dari cache atau API
        const result = await getCachedOrFetch(cacheKey, async () => {
          const { data } = await apiClient.get("/search", {
            params: {
              part: "snippet",
              q: query,
              type: "video",
              maxResults,
              safeSearch: "moderate",
            },
          });
          return data.items || [];
        });
        resolve(result);
      } catch (err) {
        console.error(
          "Error fetching search results:",
          err.response?.data || err.message
        );
        reject(err);
      }
    }, 300); // delay 300ms
  });
}

// Mendapatkan video terkait berdasarkan videoId
export async function getRelatedVideos(videoId, maxResults = 10) {
  try {
    const id = extractVideoId(videoId);
    if (!id) throw new Error("Invalid videoId");

    const cacheKey = `related_${id}_${maxResults}`;

    return await getCachedOrFetch(cacheKey, async () => {
      let searchQuery = "";
      let categoryId = null;

      try {
        // Ambil metadata video untuk mendapatkan judul, channel, dan tags
        const { data: videoData } = await apiClient.get("/videos", {
          params: {
            part: "snippet",
            id,
          },
        });

        const video = videoData.items?.[0];
        if (video) {
          const { title, channelTitle, tags = [] } = video.snippet;
          categoryId = video.snippet.categoryId;

          // Buat query pencarian dari 3 kata pertama judul dan 2 tag teratas
          const titleWords = title.split(" ").slice(0, 3).join(" ");
          const topTags = tags.slice(0, 2).join(" ");
          searchQuery = `${titleWords} ${topTags}`.trim() || channelTitle;
        }
      } catch (err) {
        // Jika gagal ambil metadata, gunakan query fallback
        console.warn(
          "Could not fetch video metadata, using fallback search",
          err
        );
        searchQuery = "trending music";
      }

      // Cari video terkait menggunakan query yang sudah dibuat
      const { data } = await apiClient.get("/search", {
        params: {
          part: "snippet",
          type: "video",
          q: searchQuery,
          maxResults: maxResults * 2,
          safeSearch: "moderate",
          order: "relevance",
          ...(categoryId && { videoCategoryId: categoryId }),
        },
      });

      const relatedVideos = data.items || [];
      // Ambil video unik dan batasi jumlah sesuai maxResults
      return uniqueVideos(relatedVideos, id).slice(0, maxResults);
    });
  } catch (err) {
    // Jika gagal, fallback ke trending videos
    console.error(
      "Error fetching related videos:",
      err.response?.data || err.message
    );

    try {
      const trending = await getTrendingVideos("ID", maxResults);
      return uniqueVideos(trending, extractVideoId(videoId));
    } catch (fallbackErr) {
      console.error("Fallback also failed:", fallbackErr);
      return [];
    }
  }
}

// Mendapatkan video trending berdasarkan region
export async function getTrendingVideos(regionCode = "ID", maxResults = 10) {
  const cacheKey = `trending_${regionCode}_${maxResults}`;

  return await getCachedOrFetch(cacheKey, async () => {
    try {
      const { data } = await apiClient.get("/videos", {
        params: {
          part: "snippet",
          chart: "mostPopular",
          regionCode,
          maxResults,
        },
      });
      return data.items || [];
    } catch (err) {
      console.error(
        "Error fetching trending videos:",
        err.response?.data || err.message
      );
      throw err;
    }
  });
}

// Membersihkan cache
export function clearCache() {
  cache.clear();
}

// Preload video trending agar lebih cepat saat dibutuhkan
export async function preloadTrendingVideos() {
  try {
    await getTrendingVideos("ID", 12);
    console.log("Trending videos preloaded");
  } catch (err) {
    console.error("Failed to preload trending videos:", err);
  }
}

// Counter untuk menghitung jumlah pemanggilan API
let apiCallCount = 0;
const originalGet = apiClient.get;
// Override method get untuk menambah counter dan log setiap pemanggilan API
apiClient.get = function (...args) {
  apiCallCount++;
  console.log(`API Call #${apiCallCount}:`, args[0]);
  return originalGet.apply(this, args);
};

// Mengambil jumlah pemanggilan API
export function getApiCallCount() {
  return apiCallCount;
}

// Reset jumlah pemanggilan API
export function resetApiCallCount() {
  apiCallCount = 0;
}
