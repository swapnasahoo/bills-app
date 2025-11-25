import { UserDataContext } from "@/context/UserDataContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewUserScreen = () => {
  const { id } = useLocalSearchParams();
  const { users, updateUser } = useContext(UserDataContext);

  const foundUser = users.find((user) => user.id === Number(id));

  const [newName, setNewName] = useState(foundUser?.name ?? "");
  const [newRoomNo, setNewRoomNo] = useState(
    foundUser?.roomNo.toString() ?? ""
  );

  if (!foundUser) return null;

  return (
    <View className="bg-[#0d1117] flex-1 p-6">
      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center gap-4">
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="#60a5fa"
            onPress={() => router.push("/")}
          />
          <Text className="text-xl text-white font-bold">Edit User</Text>
        </View>

        {/* EDIT USER FORM */}
        <View className="mt-8 gap-4 items-center">
          <TextInput
            placeholder="Name"
            placeholderTextColor="#9ca3af"
            className="text-white text-xl 
                       border border-[#1f2937] bg-[#111827]
                       p-2 rounded-md w-full"
            value={newName}
            onChangeText={setNewName}
          />

          <TextInput
            placeholder="Room number"
            placeholderTextColor="#9ca3af"
            className="text-white text-xl 
                       border border-[#1f2937] bg-[#111827]
                       p-2 rounded-md w-full"
            keyboardType="numeric"
            value={newRoomNo}
            onChangeText={setNewRoomNo}
          />

          <Pressable
            className="bg-[#60a5fa] px-10 py-2 rounded-md mt-2"
            onPress={() => {
              if (!newName.trim() || !newRoomNo.trim()) {
                Alert.alert("Error", "Please fill all the fields.", [
                  { text: "OK", style: "cancel" },
                ]);
                return;
              }

              updateUser(Number(id), newName, Number(newRoomNo));
              router.push("/");
            }}
          >
            <Text className="text-lg font-semibold text-white tracking-wide">
              Update
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default NewUserScreen;
