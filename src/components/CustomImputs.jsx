import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Feather } from "react-native-vector-icons";
import { CustumErrorInput } from "./CustumErrorInput";

export const CustomconInput = ({ name, formik }) => {
  const [viewPw, setViewPw] = useState(true);
  const [icon, setIcon] = useState("eye-off");
  const [opacity, setOpacity] = useState("0.3");

  const handleViewPw = () => {
    if (viewPw) {
      setViewPw(false);
      setIcon("eye");
      setOpacity("1");
    } else {
      setViewPw(true);
      setIcon("eye-off");
      setOpacity("0.3");
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => handleViewPw()} style={styles.iconPass}>
        <Feather name={icon} size={20} color={`rgba(0,0,0, ${opacity})`} />
      </Pressable>
      <TextInput
        style={styles.inputText}
        placeholder="Pasword"
        placeholderTextColor="grey"
        secureTextEntry={viewPw}
        name={name}
        onChangeText={(value) => formik.setFieldValue(name, value)}
      />
      {formik.errors.contraseña && (
        <CustumErrorInput message={formik.errors.contraseña} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },

  inputText: {
    height: 40,
    margin: 12,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },

  iconPass: {
    position: "absolute",
    right: 30,
    top: 20,
    fontSize: 20,
    zIndex: 999,
  },
});
