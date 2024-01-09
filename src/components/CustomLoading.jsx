import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export const CustomLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#0000ff",
    textAlign: "center",
  },
});
