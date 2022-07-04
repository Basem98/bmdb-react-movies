import actions from './types';

export function addToFavourites(payload) {
  return {
    type: actions.ADD_TO_FAVOURITES,
    payload
  }
}


export function reomveFromFavourites(payload) {
  return {
    type: actions.REMOVE_FROM_FAVOURITES,
    payload
  }
}

export function storeAllMovies(payload) {
  return {
    type: actions.STORE_ALL_MOVIES,
    payload
  }
}