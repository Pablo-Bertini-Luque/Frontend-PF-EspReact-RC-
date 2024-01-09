import { types } from "../types/Types";

export const AuthReducer = (state = {}, action) => {
  switch (action.type) {
    case types.auth.login:
      return {
        ...state,
        user: action.payload.user,
        isLogged: true,
        errorMessage: "",
      };
    case types.auth.error:
      return {
        ...state,
        user: null,
        isLogged: false,
        errorMessage: action.payload.errorMessage,
      };
    case types.auth.logout:
      return {
        user: null,
        isLogged: action.payload,
        errorMessage: "",
      };

    default:
      return state;
  }
};
