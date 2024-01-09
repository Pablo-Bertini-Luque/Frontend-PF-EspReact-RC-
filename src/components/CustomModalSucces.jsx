import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const CustomModalSucces = ({
  activeModal,
  text,
  handleSuccessCloseModal,
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        visible={activeModal}
        transparent={true}
        hardwareAccelerated={true}
      >
        <View style={styles.container}>
          <View style={styles.box}>
            <AntDesign name="checkcircle" size={35} color="white" />
            <Text
              style={{
                fontSize: 20,
                color: "white",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {text}
            </Text>
            <Pressable onPress={handleSuccessCloseModal}>
              <Text style={styles.close}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  box: {
    backgroundColor: "green",
    alignItems: "center",
    margin: 20,
    padding: 30,
    borderRadius: 10,
  },

  close: {
    marginTop: 30,
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    borderRadius: 5,
    backgroundColor: "green",
  },
});
