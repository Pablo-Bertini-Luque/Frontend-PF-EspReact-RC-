import React, { useState, useContext } from "react";
import { Button, View } from "react-native";
import { CustomModal } from "./CustomModal";
import { AuthContext } from "../contexts/AuthContext";

export const ButtonCreateNewTurn = ({ navigation }) => {
  const [text, setText] = useState("");
  const [activeErrorModal, setActiveErrorModal] = useState(false);
  const { state } = useContext(AuthContext);

  const handleCloseModal = () => {
    setActiveErrorModal(false);
  };

  const checkIsLogged = async () => {
    if (state.isLogged) {
      return navigation.navigate("CreateTurn");
    } else {
      setActiveErrorModal(true);
      setText("Para poder crear un turno, debe haber iniciado sesion");
    }
  };

  return (
    <>
      <View>
        <Button title="Crear turno" onPress={checkIsLogged} />
      </View>
      <CustomModal
        text={text}
        activeErrorModal={activeErrorModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};
