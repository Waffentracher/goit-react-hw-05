import axios from "axios";

const API_KEY = "e59f4cb165598ef6cf18d8c6ce0502aa";
const BASE_URL = "https://api.themoviedb.org/3";

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await instance.get("/trending/movie/day");
  return response.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const response = await instance.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};
export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return response.data.results;
};
