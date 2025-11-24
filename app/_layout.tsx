import UserDataContextProvider from "@/context/UserDataContext";
import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <UserDataContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="NewUserScreen"
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack>
    </UserDataContextProvider>
  );
}
