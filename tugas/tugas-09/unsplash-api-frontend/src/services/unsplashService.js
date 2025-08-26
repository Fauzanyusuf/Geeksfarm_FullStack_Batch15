import axios from "axios";

const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
const BASE_URL = "https://api.unsplash.com";

export async function searchImages(query, page = 1, per_page = 10) {
  try {
    const res = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        query,
        page,
        per_page,
        client_id: API_KEY,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching images:", err);

    throw err;
  }
}
