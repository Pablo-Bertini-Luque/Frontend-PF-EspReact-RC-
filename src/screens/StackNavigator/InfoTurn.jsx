import { useContext, useEffect } from "react";
import { Button, Text, View, StyleSheet, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesGral } from "../../css/Theme";
import { CustomModal } from "../../components/CustomModal";
import { useGetTurn } from "../../hooks/UseGetTurn";
import { CustomLoading } from "../../components/CustomLoading";
import { TurnsContext } from "../../contexts/TurnsContext";
import { AuthContext } from "../../contexts/AuthContext";
import { CustomModalSucces } from "../../components/CustomModalSucces";

export const InfoTurn = ({ route, navigation }) => {
  const { idTurn } = route.params;

  const { joinTurn } = useContext(TurnsContext);
  const { state } = useContext(AuthContext);

  const {
    detailsTurn,
    textModal,
    textModalError,
    activeModal,
    activeModalError,
    getTurn,
    setTextModal,
    setActiveModal,
    setTextModalError,
    setActiveModalError,
    handleCloseModal,
  } = useGetTurn();

  useEffect(() => {
    getTurn(idTurn);
  }, []);

  const addTurn = (detailsTurn) => {
    if (state.isLogged) {
      setActiveModal(true);
      setTextModal("Te uniste a la partida");
      return joinTurn(detailsTurn);
    }

    return (
      setTextModalError("Para poder unirse a la partida, debe iniciar sesión"),
      setActiveModalError(true)
    );
  };

  if (detailsTurn === null) {
    return <CustomLoading />;
  }

  return (
    <>
      <SafeAreaView style={stylesGral.safeAreaView}>
        <View style={styles.container}>
          <View style={{ flex: 3 }}>
            <View style={styles.containerImage}>
              <Image
                source={require("../../../assets/ImagenInfoTurn.jpeg")}
                style={styles.image}
              />
            </View>
            <View style={styles.containerText}>
              <Text style={styles.text}>
                Lugar: {detailsTurn?.turno?.lugar || "N/A"}
              </Text>
              <Text style={styles.text}>
                Dia y Hora del turno: {detailsTurn?.turno?.hora || "N/A"}
              </Text>
              <Text style={styles.text}>
                Categoria de los jugadores:{" "}
                {detailsTurn?.turno?.categoria || "N/A"}
              </Text>
              <Text style={styles.text}>
                Tipo de cancha: {detailsTurn?.turno?.tipoCancha || "N/A"}
              </Text>
              <Text style={styles.text}>
                Creador del Turno:{" "}
                {detailsTurn?.UsuarioCreadordelTurno || "N/A"}
              </Text>
            </View>
            <View style={styles.button}>
              <Button
                title="Unirse a la partida"
                onPress={(event) => {
                  event.persist();
                  addTurn(detailsTurn);
                }}
              />
              <Pressable
                style={{ marginTop: 30 }}
                onPress={() => navigation.goBack()}
              >
                <Text style={{ fontSize: 17 }}>Volver a inicio</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <CustomModal
        text={textModalError}
        activeErrorModal={activeModalError}
        handleCloseModal={handleCloseModal}
      />
      <CustomModalSucces
        activeModal={activeModal}
        text={textModal}
        handleSuccessCloseModal={handleCloseModal}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  containerImage: {
    flex: 1,
    alignSelf: "center",
    marginTop: 20,
  },
  image: {
    width: 170,
    height: 170,
    borderWidth: 50,
  },
  containerText: {
    flex: 1,
    margin: 25,
  },
  text: {
    marginBottom: 15,
    height: 30,
    fontSize: 18,
  },
  button: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
  },
});
