import "react-native-gesture-handler";
import * as Updates from "expo-updates";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TabNavigation } from "./src/navigator/TabNavigation";
import { AuthProvider } from "./src/providers/AuthProvider";
import { TurnsProvider } from "./src/providers/TurnsProvider";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    onFetchUpdateAsync();
  }, []);

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <TurnsProvider>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </TurnsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
