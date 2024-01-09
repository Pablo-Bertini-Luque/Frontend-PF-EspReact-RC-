import React, { useReducer, useState } from "react";
import { TurnsContext } from "../contexts/TurnsContext";
import { TurnsReducer } from "../reducers/TurnsReducers";
import { padelApiUrl } from "../../config/padelpertuttiApi";
import { types } from "../types/Types";

const initialState = {
  turn: "",
  errorMessage: "",
  isLoading: true,
  myTurns: [],
};

export const TurnsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TurnsReducer, initialState);
  const [activeErrorModal, setActiveErrorModal] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [textModal, setTextModal] = useState("");

  const handleCloseModal = () => {
    setActiveErrorModal(false);
  };

  const handleSuccessCloseModal = () => {
    setActiveModal(false);
  };

  const getAllTurnos = async () => {
    try {
      const allTurns = await padelApiUrl.get("/turnos");

      dispatch({
        type: types.turns.loadTurns,
        payload: {
          turns: allTurns.data.turnos,
        },
      });
    } catch (error) {
      dispatch({
        type: types.turns.errorsTurns,
        payload: {
          errorMessage: error.response.data.errors.msg,
        },
      });

      setActiveErrorModal(true);
    }
  };

  const newTurn = async (lugar, hora, categoria, tipoCancha) => {
    try {
      const register = await padelApiUrl.post("/turnos", {
        lugar,
        hora,
        categoria,
        tipoCancha,
      });
      dispatch({
        type: types.turns.newTurns,
        payload: {
          newTurn: register.data.turno,
        },
      });
      setTextModal(register.data.msg);
      setActiveModal(true);
    } catch (error) {
      dispatch({
        type: types.turns.errorsTurns,
        payload: {
          errorMessage: error.response.data.errors[0].msg,
        },
      });
      setActiveErrorModal(true);
    }
  };

  const joinTurn = (data) => {
    const idAllTurns = state.myTurns.map((item) => item.turno._id);

    const existsTurn = idAllTurns.includes(data.turno._id);

    if (!existsTurn) {
      dispatch({
        type: types.turns.myTurns,
        payload: data,
      });
    }
  };

  return (
    <TurnsContext.Provider
      value={{
        state,
        handleCloseModal,
        handleSuccessCloseModal,
        activeErrorModal,
        getAllTurnos,
        newTurn,
        textModal,
        activeModal,
        joinTurn,
      }}
    >
      {children}
    </TurnsContext.Provider>
  );
};
