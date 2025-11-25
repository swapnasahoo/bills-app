import { UserDataContext } from "@/context/UserDataContext";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.toLowerCase().trim();

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().trim().includes(query) ||
      user.roomNo.toString().includes(query)
  );

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
    <View className="bg-[#0d1117] flex-1 p-6">
      <StatusBar style="light" />

      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center">
          <Text className="text-white font-bold text-4xl">Bills</Text>

          <TextInput
            placeholder="Search"
            placeholderTextColor="#9ca3af"
            className="text-white text-xl p-2 w-[80%] 
                     border border-[#1f2937] bg-[#111827] 
                     rounded-md ml-4"
            onChangeText={setSearchQuery}
          />
        </View>

        {/* LIST */}
        <Text className="text-gray-300 text-xl font-semibold mt-8">
          Total: {filteredUsers.length}
        </Text>

        <FlatList
          data={filteredUsers}
          keyExtractor={(user) => user.id.toString()}
          contentContainerStyle={{
            paddingBottom: 95,
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
              className="flex-row items-center gap-4 mt-2 mb-2 
                       bg-[#111827] px-6 h-20 rounded-md 
                       border border-[#1f2937]"
              onPress={() =>
                router.push({
                  pathname: "/bills/UserBillScreen",
                  params: { id: item.id },
                })
              }
            >
              {/* ROOM BOX */}
              <View className="bg-[#1f2937] p-4 w-15 h-15 rounded-md justify-center items-center">
                <Text className="text-white text-lg font-semibold">
                  {item.roomNo}
                </Text>
              </View>

              <Text className="text-gray-300 text-2xl font-semibold mr-auto">
                {item.name}
              </Text>

              <Feather
                name="edit"
                size={20}
                color="#34d399" // matching actionEdit
                onPress={() =>
                  router.push({
                    pathname: "/user/UserEditScreen",
                    params: { id: item.id },
                  })
                }
              />

              <Feather
                name="trash-2"
                size={20}
                color="#f87171" // matching actionDelete
                onPress={() => confirmDeleteUser(item.id)}
              />
            </Pressable>
          )}
        />
      </SafeAreaView>

      {/* ADD ICON */}
      <Pressable
        className="bg-[#60a5fa] w-16 h-16 rounded-xl items-center justify-center 
                 absolute bottom-0 right-0 mb-25 mr-6"
        onPress={() => router.push("/user/NewUserScreen")}
      >
        <MaterialIcons name="add" size={28} color="white" />
      </Pressable>
    </View>
  );
}
