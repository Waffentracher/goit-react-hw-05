import axios from "axios";

const API_KEY = "e59f4cb165598ef6cf18d8c6ce0502aa";
const BASE_URL = "https://api.themoviedb.org/3";

// Створення екземпляра axios з базовим URL
const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Функція для отримання популярних фільмів
export const fetchTrendingMovies = async () => {
  const response = await instance.get("/trending/movie/day");
  return response.data.results;
};

// Функція для пошуку фільмів за запитом
export const fetchMoviesByQuery = async (query) => {
  const response = await instance.get("/search/movie", {
    params: { query },
  });
  return response.data.results;
};

// Функція для отримання деталей фільму
export const fetchMovieDetails = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}`);
  return response.data;
};

// Функція для отримання акторського складу фільму
export const fetchMovieCast = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

// Функція для отримання оглядів фільму
export const fetchMovieReviews = async (movieId) => {
  const response = await instance.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
