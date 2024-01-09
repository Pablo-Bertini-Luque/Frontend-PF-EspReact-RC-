import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const CustumErrorInput = ({ message }) => {
  return (
    <View>
      <Text style={style.text}>{message}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  text: {
    color: "red",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
