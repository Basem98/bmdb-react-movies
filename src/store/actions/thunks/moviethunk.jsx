import axiosInstance from '../../../network/axios';
import { storeAllMovies } from '../favmovies';


export function fetchAllMovies(page, language) {
  return async function (dispatch, getState) {
    const movies = await axiosInstance.get('/movie/popular', { params: { page, language } });
    dispatch(storeAllMovies(movies.data.results));
    return movies;
  }
}