import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

// Search for a person
export const findPerson = async (req, res) => {
  const { query: searchQuery } = req.params;
  try {
    const apiResponse = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${searchQuery}&include_adult=false&language=en-US&page=1`
    );

    if (!apiResponse.results.length) {
      return res.status(404).send(null);
    }

    const person = apiResponse.results[0];

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: person.id,
          image: person.profile_path,
          title: person.name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, results: apiResponse.results });
  } catch (err) {
    console.error("Error in findPerson:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Search for a movie
export const findMovie = async (req, res) => {
  const { query: searchQuery } = req.params;
  try {
    const apiResponse = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`
    );

    if (!apiResponse.results.length) {
      return res.status(404).send(null);
    }

    const movie = apiResponse.results[0];

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: movie.id,
          image: movie.poster_path,
          title: movie.title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, results: apiResponse.results });
  } catch (err) {
    console.error("Error in findMovie:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Search for a TV show
export const findTvShow = async (req, res) => {
  const { query: searchQuery } = req.params;
  try {
    const apiResponse = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${searchQuery}&include_adult=false&language=en-US&page=1`
    );

    if (!apiResponse.results.length) {
      return res.status(404).send(null);
    }

    const tvShow = apiResponse.results[0];

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: tvShow.id,
          image: tvShow.poster_path,
          title: tvShow.name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, results: apiResponse.results });
  } catch (err) {
    console.error("Error in findTvShow:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Retrieve search history
export const getUserSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, history: req.user.searchHistory });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Remove an item from search history
export const deleteSearchHistoryItem = async (req, res) => {
  const { id: itemId } = req.params;

  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: parseInt(itemId) },
      },
    });

    res.status(200).json({ success: true, message: "Search history item removed successfully." });
  } catch (err) {
    console.error("Error in deleteSearchHistoryItem:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
