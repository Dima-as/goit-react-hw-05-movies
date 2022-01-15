const API_KEY = "39332b02ec9d58b8bff90f4b70a34b04";
const BASE_URL = "https://api.themoviedb.org/3";
async function fetchWithErrorHandling(url = "", config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error("Not found"));
}
export function fetchPopular() {
  return fetchWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=1&language=en`
  );
}
export function fetchFilm(name, page = 1) {
  return fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&page=${page}&language=en&query=${name}`
  ).then((response) => response.json());
}
export function fetcMovieDetails(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&page=1&language=en`
  );
}
export function fetchCast(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  );
}
export function fetchReviews(movieId) {
  return fetchWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
}
