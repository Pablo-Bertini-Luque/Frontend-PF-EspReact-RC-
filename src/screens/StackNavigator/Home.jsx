import { stylesGral } from "../../css/Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductsList } from "../../components/ProductsList";
import { useContext, useEffect } from "react";
import { TurnsContext } from "../../contexts/TurnsContext";
import { EmptyTurns } from "../StackNavigatorSession/EmptyTurns";
import { ButtonCreateNewTurn } from "../../components/ButtonCreateNewTurn";
import { StyleSheet, View, Text } from "react-native";
import { CustomLoading } from "../../components/CustomLoading";

export const Home = ({ navigation, route }) => {
  const { state, getAllTurnos } = useContext(TurnsContext);

  useEffect(() => {
    getAllTurnos();
  }, []);

  const stateTurns = Object.keys(state.turn);

  if (state.isLoading) {
    return (
      <SafeAreaView style={stylesGral.safeAreaView}>
        <CustomLoading />
      </SafeAreaView>
    );
  }

  if (stateTurns.length === 0) {
    return (
      <SafeAreaView style={stylesGral.safeAreaView}>
        <EmptyTurns navigation={navigation} />
      </SafeAreaView>
    );
  }

  if (stateTurns.length >= 1) {
    return (
      <SafeAreaView style={stylesGral.safeAreaView}>
        <View style={styles.container}>
          <Text style={styles.text}>Padel per Tutti</Text>
          <ButtonCreateNewTurn navigation={navigation} />
        </View>
        <View style={{ flex: 7 }}>
          <ProductsList
            navigation={navigation}
            route={route}
            data={state.turn}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 10,
  },
  text: {
    width: 150,
    textAlignVertical: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginEnd: 20,
  },
});
