import UserDataContextProvider from "@/context/UserDataContext";
import { Stack } from "expo-router";
import "../global.css";
import Toast from 'react-native-toast-message';

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
          name="user/NewUserScreen"
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="user/UserEditScreen"
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="bills/UserBillScreen"
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="bills/NewBillScreen"
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="bills/EditBillScreen"
          options={{
            animation: "slide_from_right",
          }}
        />
      </Stack>
    <Toast />
    </UserDataContextProvider>
  );
}
