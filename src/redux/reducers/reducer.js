import { state as defaultState } from "../initialState.js";

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USERSLIST":
      return { ...state, usersList: action.value };
    case "ENABLE_PAGINATE":
      return { ...state, ableToPaginate: true };
    case "DISABLE_PAGINATE":
      return { ...state, ableToPaginate: false };
    default:
      return state;
  }
};
