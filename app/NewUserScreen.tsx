import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewUserScreen = () => {
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
          <Text className="text-xl text-white font-bold">New User</Text>
        </View>

        {/* NEW USER FORM */}
        <View className="mt-8 gap-4 items-center">
          <TextInput
            placeholder="Name"
            className="text-white text-xl placeholder:text-gray-400 
            border-2 border-blue-600 p-2 rounded-md w-full"
          ></TextInput>
          <TextInput
            placeholder="Room number"
            className="text-white text-xl placeholder:text-gray-400 
            border-2 border-blue-600 p-2 rounded-md w-full"
            keyboardType="numeric"
          ></TextInput>

          <Pressable className="bg-amber-500 px-8 py-1 rounded-md">
            <Text className="text-lg font-semibold">Add</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default NewUserScreen;
