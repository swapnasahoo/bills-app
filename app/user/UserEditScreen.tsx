import { UserDataContext } from "@/context/UserDataContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewUserScreen = () => {
  const { id } = useLocalSearchParams();
  const { users } = useContext(UserDataContext);

  const foundUser = users.find((user) => user.id === Number(id));

  const [newName, setNewName] = useState(foundUser?.name ?? "");
  const [newRoomNo, setNewRoomNo] = useState(
    foundUser?.roomNo.toString() ?? ""
  );
  const { updateUser } = useContext(UserDataContext);

  if (!foundUser) return null;

  return (
    <View className="bg-gray-800 flex-1 p-6">
      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center gap-4">
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => router.push("/")}
          />
          <Text className="text-xl text-white font-bold">Edit User</Text>
        </View>

        {/* EDIT USER FORM */}
        <View className="mt-8 gap-4 items-center">
          <TextInput
            placeholder="Name"
            className="text-white text-xl placeholder:text-gray-400 
            border-2 border-blue-600 p-2 rounded-md w-full"
            value={newName}
            onChangeText={setNewName}
          ></TextInput>
          <TextInput
            placeholder="Room number"
            className="text-white text-xl placeholder:text-gray-400 
            border-2 border-blue-600 p-2 rounded-md w-full"
            keyboardType="numeric"
            value={newRoomNo}
            onChangeText={setNewRoomNo}
          ></TextInput>

          <Pressable
            className="bg-amber-500 px-10 py-1 rounded-md"
            onPress={() => {
              updateUser(Number(id), newName, Number(newRoomNo));
              router.push("/");
            }}
          >
            <Text className="text-lg font-semibold">Update</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default NewUserScreen;
