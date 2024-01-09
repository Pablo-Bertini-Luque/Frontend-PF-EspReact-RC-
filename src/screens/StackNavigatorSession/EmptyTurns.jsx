import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { stylesGral } from "../../css/Theme";
import { ButtonCreateNewTurn } from "../../components/ButtonCreateNewTurn";

export const EmptyTurns = ({ navigation }) => {
  return (
    <SafeAreaView style={stylesGral.safeAreaView}>
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>No hay turnos disponibles</Text>
          <View style={styles.button}>
            <ButtonCreateNewTurn navigation={navigation} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },

  text: {
    fontSize: 24,
    fontWeight: "700",
    height: 100,
    textAlign: "center",
  },

  button: {
    marginTop: 30,
    alignItems: "center",
  },
});
