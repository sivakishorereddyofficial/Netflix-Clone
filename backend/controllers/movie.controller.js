import { fetchFromTMDB } from "../services/tmdb.service.js";

// Fetch trending movies and return a random one
export const fetchTrendingMovie = async (req, res) => {
  try {
    const response = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      response.results[Math.floor(Math.random() * response.results?.length)];
    res.status(200).json({ success: true, movie: randomMovie });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Fetch trailers for a specific movie
export const fetchMovieTrailers = async (req, res) => {
  const { id: movieId } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: response.results });
  } catch (err) {
    if (err.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Fetch details of a specific movie
export const fetchMovieDetails = async (req, res) => {
  const { id: movieId } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
    );
    res.status(200).json({ success: true, details: response });
  } catch (err) {
    if (err.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Fetch movies similar to a specific movie
export const fetchSimilarMovies = async (req, res) => {
  const { id: movieId } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, similarMovies: response.results });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Fetch movies by category (e.g., popular, upcoming)
export const fetchMoviesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, movies: response.results });
  } catch (err) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
