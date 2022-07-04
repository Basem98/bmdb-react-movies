import { combineReducers } from 'redux';
import favouritesReducer from './favreducers';
import moviesReducer from './moviereducers';


export default combineReducers({
  favourites: favouritesReducer,
  movies: moviesReducer
});