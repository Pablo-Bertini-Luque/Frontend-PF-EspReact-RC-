import React, { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TurnsContext } from "../../contexts/TurnsContext";
import { MyTurnsList } from "../../components/MyTurnsList";
import { stylesGral } from "../../css/Theme";

export const MyTurns = ({ navigation }) => {
  const { state } = useContext(TurnsContext);

  if (state.myTurns.length === 0) {
    return (
      <SafeAreaView style={stylesGral.safeAreaView}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 50 }}
            >
              No tenes turnos seleccionados
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={stylesGral.safeAreaView}>
      <View>
        <FlatList
          data={state.myTurns}
          keyExtractor={(item) => item.turno._id}
          renderItem={({ item }) => (
            <MyTurnsList data={item} navigation={navigation} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};
