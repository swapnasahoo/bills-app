import { UserDataContext } from "@/context/UserDataContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewUserScreen = () => {
  const [name, setName] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const { users, addUser } = useContext(UserDataContext);

  return (
    <View className="bg-[#0d1117] flex-1 p-6">
      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center gap-4">
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="#60a5fa" // primary accent
            onPress={() => router.push("/")}
          />
          <Text className="text-xl text-white font-bold">New User</Text>
        </View>

        {/* NEW USER FORM */}
        <View className="mt-8 gap-4 items-center">
          <TextInput
            placeholder="Name"
            placeholderTextColor="#9ca3af"
            className="text-white text-xl 
                       border border-[#1f2937] bg-[#111827]
                       p-2 rounded-md w-full"
            onChangeText={setName}
          />

          <TextInput
            placeholder="Room number"
            placeholderTextColor="#9ca3af"
            className="text-white text-xl 
                       border border-[#1f2937] bg-[#111827]
                       p-2 rounded-md w-full"
            keyboardType="numeric"
            value={roomNo}
            onChangeText={(text) => {
              const cleaned = text.replace(/[-,]/g, "");

              if (cleaned.length > 2) {
                Alert.alert("Error", "Room number should not be 3 digit", [
                  { text: "OK", style: "cancel" },
                ]);
                return;
              }
              setRoomNo(cleaned);
            }}
          />

          <Pressable
            className="bg-[#60a5fa] px-10 py-2 rounded-md mt-2"
            onPress={() => {
              if (!name.trim() || !roomNo.trim()) {
                Alert.alert("Error", "Please fill all the fields.", [
                  { text: "OK", style: "cancel" },
                ]);
                return;
              }

              const match = users.find(
                (user) => user.roomNo === Number(roomNo)
              );

              if (match) {
                Alert.alert(
                  "Error",
                  `Room number is already alloted to ${match.name}`,
                  [{ text: "OK", style: "cancel" }]
                );
                return;
              }

              addUser(Date.now(), name, Number(roomNo));
              router.push("/");
            }}
          >
            <Text className="text-lg font-semibold text-white tracking-wide">
              Add
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default NewUserScreen;
