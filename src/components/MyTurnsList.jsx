import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export const MyTurnsList = ({ navigation, data }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.containerText}>
          <Text style={styles.text}>Lugar: {data.turno.lugar}</Text>
          <Text style={styles.text}>Hora: {data.turno.hora}</Text>
          <Text style={styles.text}>Categoria: {data.turno.categoria}</Text>
        </View>
        <View style={styles.containerButton}>
          <Button
            title="Ver mas"
            color="black"
            onPress={() =>
              navigation.navigate("InfoTurn", { idTurn: data.turno._id })
            }
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 3,
    padding: 10,
    borderWidth: 2,
    backgroundColor: "#2196F3",
  },
  containerText: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  containerButton: {
    justifyContent: "center",
  },
});
