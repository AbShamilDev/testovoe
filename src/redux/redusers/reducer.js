import { state as defaultState } from "../initialState";

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USERSLIST":
      return { usersList: action.value };
    default:
      return state;
  }
};
