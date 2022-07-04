import actions from '../actions/types';

export default function favouritesReducer(state = JSON.parse(localStorage.getItem('favourites') || "[]"), action) {
  let newState = state;
  switch (action.type) {
    case actions.ADD_TO_FAVOURITES: {
      newState = [
        ...state,
        action.payload
      ];
      break;
    }
    case actions.REMOVE_FROM_FAVOURITES: {
      newState = state.filter(movie => movie.id !== action.payload.id);
      break;
    }
    default: {
      break;
    }
  }
  localStorage.setItem('favourites', JSON.stringify(newState));
  return newState;
}