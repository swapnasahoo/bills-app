import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { StatusBar } from "expo-status-bar";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
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
                       border-2 border-blue-500 rounded-full ml-4"
          ></TextInput>
        </View>

        {/* LIST */}
        <Text className="text-white text-xl font-semibold mt-8">
          Total: 540
        </Text>
        <View className="flex-row items-center gap-4 mt-2 mb-2 bg-gray-600 h-20 px-6 rounded-md shadow-md elevation-lg">
          <View className="bg-pink-400 p-4 w-15 h-15 rounded-full justify-center items-center">
            <Text className="text-white text-lg font-semibold">25</Text>
          </View>
          <Text className="text-white text-2xl font-semibold">Arnav</Text>
        </View>
        <View className="flex-row items-center gap-4 mt-2 bg-gray-600 h-20 px-6 rounded-md shadow-md elevation-lg">
          <View className="bg-pink-400 p-4 w-15 h-15 rounded-full justify-center items-center">
            <Text className="text-white text-lg font-semibold">25</Text>
          </View>
          <Text className="text-white text-2xl font-semibold">Arnav</Text>
        </View>
      </SafeAreaView>

      {/* ADD ICON */}
      <View className="bg-sky-600 w-16 h-16 rounded-xl items-center justify-center shadow-md elevation-xl absolute bottom-0 right-0 mb-25 mr-6">
        <MaterialIcons name="add" size={28} color="white" />
      </View>
    </View>
  );
}
