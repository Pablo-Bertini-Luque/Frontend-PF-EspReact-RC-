import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Session } from "../screens/StackNavigatorSession/Session";
import { Register } from "../screens/StackNavigatorSession/Register";
import { Profile } from "../screens/StackNavigatorSession/Profile";
import { Login } from "../screens/Auths/Login";

const Stack = createNativeStackNavigator();

export const StackNavigatorSession = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Session" component={Session} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
