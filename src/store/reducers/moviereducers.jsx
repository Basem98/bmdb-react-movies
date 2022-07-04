import actions from "../actions/types";

export default function moviesReducer(state = [], action) {
  switch (action.type) {
    case actions.STORE_ALL_MOVIES: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}