import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/StackNavigator/Home";
import { InfoTurn } from "../screens/StackNavigator/InfoTurn";
import { CreateTurn } from "../screens/StackNavigator/CreateTurn";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Homes" component={Home} />
      <Stack.Screen name="InfoTurn" component={InfoTurn} />
      <Stack.Screen name="CreateTurn" component={CreateTurn} />
    </Stack.Navigator>
  );
};
