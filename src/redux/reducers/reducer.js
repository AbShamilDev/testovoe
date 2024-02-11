import { state as defaultState } from "../initialState.js";

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USERSLIST":
      return { ...state, usersList: action.value };
    case "ENABLE_PAGINATE":
      return { ...state, ableToPaginate: true };
    case "DISABLE_PAGINATE":
      return { ...state, ableToPaginate: false };
    case "SET_LIKESLIST":
      return { ...state, likesList: action.value };
    case "ADD_IN_LIKESLIST":
      return { ...state, likesList: [...state.likesList, action.value] };
    case "REMOVE_FROM_LIKESLIST":
      return {
        ...state,
        likesList: state.likesList.filter((id) => id !== action.value),
      };

    default:
      return state;
  }
};
