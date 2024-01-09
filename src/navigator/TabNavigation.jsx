import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyTurns } from "../screens/TabScreens/MyTurns";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { StackNavigator } from "./StackNavigator";
import { StackNavigatorSession } from "./StackNavigatorSession";

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {},
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Mis turnos"
        component={MyTurns}
        options={{
          tabBarIcon: () => <Entypo name="calendar" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Mi Perfil"
        component={StackNavigatorSession}
        options={{
          tabBarIcon: () => <Feather name="user" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};
