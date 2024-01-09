import React from "react";
import { Image, StyleSheet, View, Text, Button } from "react-native";

export const ProductsItem = ({ item, navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../assets/ImagenInfoTurn.jpeg")}
          style={styles.imageProduct}
        />
      </View>
      <View
        style={{
          flex: 4,
        }}
      >
        <Text style={{ padding: 5, fontSize: 20, fontWeight: "bold", flex: 3 }}>
          {item.lugar}
        </Text>
        <Text style={{ padding: 5, fontSize: 20, fontWeight: "bold", flex: 1 }}>
          {item.hora}
        </Text>
        <Text style={{ padding: 5, fontSize: 15, flex: 1 }}>
          {"Categoria: " + `${item.categoria}`}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "flex-end",
          padding: 5,
        }}
      >
        <Button
          title="Ver mas"
          onPress={() => navigation.navigate("InfoTurn", { idTurn: item._id })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "black",
    borderWidth: 2,
    margin: 8,
    padding: 3,
    borderRadius: 10,
  },

  imageProduct: {
    flex: 1,
    height: 150,
    width: "100%",
    borderRadius: 10,
  },
});
