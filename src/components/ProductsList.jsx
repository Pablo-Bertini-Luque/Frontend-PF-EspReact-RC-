import React from "react";
import { FlatList, View, StatusBar } from "react-native";
import { ProductsItem } from "./ProductsItem";

export const ProductsList = ({ navigation, data }) => {
  return (
    <>
      <StatusBar hidden={true} />
      <View style={{ padding: 3 }}>
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductsItem item={item} navigation={navigation} />
          )}
        />
      </View>
    </>
  );
};
