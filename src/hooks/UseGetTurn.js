import React, { useState } from "react";
import { padelApiUrl } from "../../config/padelpertuttiApi";

export const useGetTurn = () => {
  const [detailsTurn, setDetailsTurn] = useState(null);
  const [textModal, setTextModal] = useState("");
  const [textModalError, setTextModalError] = useState("");
  const [activeModal, setActiveModal] = useState(false);
  const [activeModalError, setActiveModalError] = useState(false);

  const handleCloseModal = () => {
    setActiveModal(false);
    setActiveModalError(false);
  };

  const getTurn = async (id) => {
    try {
      const turn = await padelApiUrl.get(`/turnos/${id}`);
      const data = turn.data;
      setDetailsTurn(data);
    } catch (error) {
      setTextModal(error.data);
      setActiveModal(true);
    }
  };
  return {
    detailsTurn,
    textModal,
    activeModal,
    handleCloseModal,
    getTurn,
    setTextModal,
    setActiveModal,
    textModalError,
    setTextModalError,
    activeModalError,
    setActiveModalError,
  };
};
