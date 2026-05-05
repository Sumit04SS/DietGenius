import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_PEXELS_API_KEY;

export const getFoodImage = async (query) => {
  try {
    const res = await axios.get(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query + " food")}&per_page=1`,
      {
        headers: {
          Authorization: process.env.EXPO_PUBLIC_PEXELS_API_KEY,
        },
      }
    );

    return res.data.photos[0]?.src?.medium;

  } catch (e) {
    console.log("IMAGE ERROR:", e);
    return null;
  }
};