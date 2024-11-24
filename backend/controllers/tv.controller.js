import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function fetchTrendingShows(request, response) {
  try {
    const apiData = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
    const randomShow = apiData.results[Math.floor(Math.random() * apiData.results?.length)];

    response.json({ success: true, content: randomShow });
  } catch (err) {
    response.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function fetchShowTrailers(request, response) {
  const { showId } = request.params;
  try {
    const apiData = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${showId}/videos?language=en-US`);
    response.json({ success: true, trailers: apiData.results });
  } catch (err) {
    if (err.message.includes("404")) {
      return response.status(404).send(null);
    }

    response.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function fetchShowDetails(request, response) {
  const { showId } = request.params;
  try {
    const apiData = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${showId}?language=en-US`);
    response.status(200).json({ success: true, content: apiData });
  } catch (err) {
    if (err.message.includes("404")) {
      return response.status(404).send(null);
    }

    response.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function fetchSimilarShows(request, response) {
  const { showId } = request.params;
  try {
    const apiData = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${showId}/similar?language=en-US&page=1`);
    response.status(200).json({ success: true, similar: apiData.results });
  } catch (err) {
    response.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function fetchShowsByCategory(request, response) {
  const { genre } = request.params;
  try {
    const apiData = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${genre}?language=en-US&page=1`);
    response.status(200).json({ success: true, content: apiData.results });
  } catch (err) {
    response.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
