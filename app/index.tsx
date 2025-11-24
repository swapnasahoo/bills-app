import { UserDataContext } from "@/context/UserDataContext";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { users, deleteUser } = useContext(UserDataContext);

  function confirmDeleteUser(id: number) {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteUser(id),
      },
    ]);
  }

  return (
    <View className="bg-gray-800 flex-1 p-6">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center">
          <Text className="text-white font-bold text-4xl">Bills</Text>
          <TextInput
            placeholder="Search"
            className="text-white text-xl p-2 placeholder:text-gray-400 w-[80%]
                       border-2 border-blue-500 rounded-md ml-4"
          ></TextInput>
        </View>

        {/* LIST */}
        <Text className="text-white text-xl font-semibold mt-8">
          Total: {users.length}
        </Text>

        <FlatList
          data={users}
          keyExtractor={(user) => user.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              className="flex-row items-center gap-4 mt-2 mb-2 bg-gray-600 h-20 px-6 rounded-md shadow-md elevation-lg"
              onPress={() => {
                router.push({
                  pathname: "/bills/UserBillScreen",
                  params: { id: item.id },
                });
              }}
            >
              <View className="bg-pink-400 p-4 w-15 h-15 rounded-md justify-center items-center">
                <Text className="text-white text-lg font-semibold">
                  {item.roomNo}
                </Text>
              </View>
              <Text className="text-white text-2xl font-semibold mr-auto">
                {item.name}
              </Text>
              <Feather
                name="edit"
                size={20}
                color="white"
                onPress={() => {
                  router.push({
                    pathname: "/user/UserEditScreen",
                    params: { id: item.id },
                  });
                }}
              />
              <Feather
                name="trash-2"
                size={20}
                color="#ff0505"
                onPress={() => confirmDeleteUser(item.id)}
              />
            </Pressable>
          )}
        ></FlatList>
      </SafeAreaView>

      {/* ADD ICON */}
      <Pressable
        className="bg-sky-600 w-16 h-16 rounded-xl items-center justify-center shadow-md elevation-xl absolute bottom-0 right-0 mb-25 mr-6"
        onPress={() => router.push("/user/NewUserScreen")}
      >
        <MaterialIcons name="add" size={28} color="white" />
      </Pressable>
    </View>
  );
}
