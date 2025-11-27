import { UserDataContext } from "@/context/UserDataContext";
import { showToast } from "@/utils/toast";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewUserScreen = () => {
  const [name, setName] = useState("");
  const [officeNo, setOfficeNo] = useState("");
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
          {/* NAME */}
          <View className="w-full gap-1">
            <Text className="text-lg text-white">Name</Text>
            <TextInput
              placeholder="Adreno"
              placeholderTextColor="#9ca3af"
              className="text-white text-xl 
                       border border-[#1f2937] bg-[#111827]
                       p-2 rounded-md w-full"
              onChangeText={setName}
            />
          </View>

          {/* OFFICE NO */}
          <View className="w-full gap-1">
            <Text className="text-lg text-white">Office No</Text>
            <TextInput
              placeholder="25"
              placeholderTextColor="#9ca3af"
              className="text-white text-xl 
                       border border-[#1f2937] bg-[#111827]
                       p-2 rounded-md w-full"
              keyboardType="numeric"
              value={officeNo}
              onChangeText={(text) => {
                const cleaned = text.replace(/[-,]/g, "");

                if (cleaned.length > 2) {
                  Alert.alert("Error", "Office number should not be 3 digit", [
                    { text: "OK", style: "cancel" },
                  ]);
                  return;
                }
                setOfficeNo(cleaned);
              }}
            />
          </View>

          <Pressable
            className="bg-[#60a5fa] px-10 py-2 rounded-md mt-2"
            onPress={() => {
              if (!name.trim() || !officeNo.trim()) {
                Alert.alert("Error", "Please fill all the fields.", [
                  { text: "OK", style: "cancel" },
                ]);
                return;
              }

              const match = users.find(
                (user) => user.officeNo === Number(officeNo)
              );

              if (match) {
                Alert.alert(
                  "Error",
                  `Office number is already alloted to ${match.name}`,
                  [{ text: "OK", style: "cancel" }]
                );
                return;
              }

              addUser(Date.now(), name, Number(officeNo));

              showToast({
                type: "success",
                text1: "Succesfull",
                text2: "User has been successfully added",
              });

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
