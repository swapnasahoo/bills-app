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
  const [newOfficeNo, setNewOfficeNo] = useState(
    foundUser?.officeNo.toString() ?? ""
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
        {/* NAME */}
        <View className="mt-8 gap-4 items-center">
          <View className="w-full gap-1">
            <Text className="text-lg text-white">Name</Text>
            <TextInput
              placeholder="Adreno"
              placeholderTextColor="#9ca3af"
              className="text-white text-xl 
                       border border-[#1f2937] bg-[#111827]
                       p-2 rounded-md w-full"
              value={newName}
              onChangeText={setNewName}
            />
          </View>

          {/* OFFICE NUMBER */}
          <View className="w-full gap-1">
            <Text className="text-lg text-white">Office No</Text>
            <TextInput
              placeholder="25"
              placeholderTextColor="#9ca3af"
              className="text-white text-xl 
                       border border-[#1f2937] bg-[#111827]
                       p-2 rounded-md w-full"
              keyboardType="numeric"
              value={newOfficeNo}
              onChangeText={(text) => {
                const cleaned = text.replace(/[-,]/g, "");

                if (cleaned.length > 2) {
                  Alert.alert("Error", "Office number should not be 3 digit", [
                    { text: "OK", style: "cancel" },
                  ]);
                  return;
                }
                setNewOfficeNo(cleaned);
              }}
            />
          </View>

          <Pressable
            className="bg-[#60a5fa] px-10 py-2 rounded-md mt-2"
            onPress={() => {
              if (!newName.trim() || !newOfficeNo.trim()) {
                Alert.alert("Error", "Please fill all the fields.", [
                  { text: "OK", style: "cancel" },
                ]);
                return;
              }

              updateUser(Number(id), newName, Number(newOfficeNo));
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
