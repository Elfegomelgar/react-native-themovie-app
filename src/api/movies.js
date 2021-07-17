import {API_HOST, API_KEY, LANG} from '../utils/constants';

export function getNewsMoviesApi(page = 1) {
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err));
}

export const getGenreMovieApi = idGenres => {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err));
};

export const getAllGenresApi = () => {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getGenresMoviesApi = idGenres => {
  const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenres}&language=${LANG}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getMovieById = idMovie => {
  const url = `${API_HOST}/movie/${idMovie}?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getVideoMovieApi = idMovie => {
  const url = `${API_HOST}/movie/${idMovie}/videos?api_key=${API_KEY}&language=${LANG}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getPopularMoviesApi = (page = 1) => {
  const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const searchMoviesApi = search => {
  const url = `${API_HOST}/search/movie?api_key=${API_KEY}&language=${LANG}&query=${search}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
};
