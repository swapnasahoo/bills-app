import { UserDataContext } from "@/context/UserDataContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewUserScreen = () => {
  const { id } = useLocalSearchParams();
  const { users } = useContext(UserDataContext);

  const foundUser = users.find((user) => user.id === Number(id));
  if (!foundUser) return null;

  return (
    <View className="bg-gray-800 flex-1 p-6">
      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center gap-4 mb-8">
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => router.push("/")}
          />
          <Text className="text-xl text-white font-bold">
            {foundUser.name} ({foundUser.roomNo})
          </Text>
        </View>

        {/* BILL LIST */}
        <View className="bg-gray-700 px-4 py-3 rounded-lg my-3 shadow-md elevation-xl">
          {/* MONTH */}
          <Text className="text-xl text-white font-semibold mb-1">
            November
          </Text>

          {/* DETAILS */}
          <Text className="text-gray-300">Date: 12/11/2025</Text>
          <Text className="text-gray-300">Rent: ₹3000</Text>
          <Text className="text-gray-300">Fix: ₹200</Text>
          <Text className="text-gray-300">Previous Reading: 1200</Text>
          <Text className="text-gray-300">Current Reading: 1500</Text>
          <Text className="text-gray-300">Reading: 300</Text>
          <Text className="text-gray-300">Unit Cost: ₹8</Text>
          <Text className="text-gray-300">Reading Cost: ₹2400</Text>

          {/* DIVIDER */}
          <View className="h-px bg-gray-600 my-3" />

          {/* TOTAL */}
          <Text className="text-amber-300 text-xl font-bold">Total: ₹5600</Text>
        </View>
        <View className="bg-gray-700 px-4 py-3 rounded-lg mt-3 shadow-md elevation-xl">
          {/* MONTH */}
          <Text className="text-xl text-white font-semibold mb-1">
            November
          </Text>

          {/* DETAILS */}
          <Text className="text-gray-300">Date: 12/11/2025</Text>
          <Text className="text-gray-300">Rent: ₹3000</Text>
          <Text className="text-gray-300">Fix: ₹200</Text>
          <Text className="text-gray-300">Previous Reading: 1200</Text>
          <Text className="text-gray-300">Current Reading: 1500</Text>
          <Text className="text-gray-300">Reading: 300</Text>
          <Text className="text-gray-300">Unit Cost: ₹8</Text>
          <Text className="text-gray-300">Reading Cost: ₹2400</Text>

          {/* DIVIDER */}
          <View className="h-px bg-gray-600 my-3" />

          {/* TOTAL */}
          <Text className="text-amber-300 text-xl font-bold">Total: ₹5600</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default NewUserScreen;
