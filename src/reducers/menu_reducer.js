import { FETCH_MENU, FILTER_MENU } from '../actions/types';

const initialState = { all: [], filter: '' };

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MENU:
      return { ...state, all: action.payload };
    case FILTER_MENU:
      return { ...state, filter: action.payload };
  }

  return state;
}
