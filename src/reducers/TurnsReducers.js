import { types } from "../types/Types";

export const TurnsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.turns.loadTurns:
      return {
        ...state,
        turn: action.payload.turns,
        errorMessage: "",
        isLoading: false,
      };
    case types.turns.newTurns:
      return {
        ...state,
        turn: [...state.turn, action.payload.newTurn],
        errorMessage: null,
        isLoading: false,
      };
    case types.turns.errorsTurns:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
        isLoading: false,
      };
    case types.turns.myTurns:
      return {
        ...state,
        myTurns: [...state.myTurns, action.payload],
      };
    default:
      return state;
  }
};
