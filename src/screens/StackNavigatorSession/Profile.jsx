import React, { useContext } from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesGral } from "../../css/Theme";
import { AuthContext } from "../../contexts/AuthContext";

export const Profile = () => {
  const { logout, state } = useContext(AuthContext);

  const onClikLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={stylesGral.safeAreaView}>
      <View style={style.containerImage}>
        {state.user.avatar && (
          <Image source={{ uri: state.user.avatar }} style={style.image} />
        )}
      </View>
      <View style={style.containerText}>
        <Text style={style.text}>Nombre: {state.user.nombre}</Text>
        <Text style={style.text}>Posición: {state.user.posicion}</Text>
      </View>
      <View style={stylesGral.button}>
        <Button title="Cerrar sesión" onPress={onClikLogout} />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  containerImage: {
    flex: 3,
    alignSelf: "center",
    justifyContent: "center",
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 50,
  },
  containerText: {
    flex: 1,
    marginLeft: 15,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
    color: "blue",
  },
});
