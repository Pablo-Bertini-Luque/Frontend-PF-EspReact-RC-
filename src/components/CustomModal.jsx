import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const CustomModal = ({ text, activeErrorModal, handleCloseModal }) => {
  return (
    <View>
      <Modal
        animationType="slide"
        visible={activeErrorModal}
        transparent={true}
        hardwareAccelerated={true}
      >
        <View style={styles.container}>
          <View style={styles.box}>
            <MaterialIcons name="error" size={35} color="red" />
            <Text
              style={{
                fontSize: 24,
                color: "red",
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {text}
            </Text>
            <Pressable onPress={handleCloseModal}>
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
    backgroundColor: "white",
    alignItems: "center",
    margin: 20,
    padding: 30,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "red",
  },

  close: {
    marginTop: 30,
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 5,
    backgroundColor: "red",
  },
});
