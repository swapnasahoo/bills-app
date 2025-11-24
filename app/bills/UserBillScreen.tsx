import { UserDataContext } from "@/context/UserDataContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewUserScreen = () => {
  const { id } = useLocalSearchParams();
  const { users, userBills } = useContext(UserDataContext);

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
        <FlatList
          data={userBills[Number(id)]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="bg-gray-700 px-4 py-3 rounded-lg my-3 shadow-md elevation-xl">
              {/* MONTH */}
              <Text className="text-xl text-white font-semibold mb-1">
                {item.month}
              </Text>

              {/* DETAILS */}
              <Text className="text-gray-300">
                Date: {new Date(item.id).toLocaleDateString("en-GB")}
              </Text>
              <Text className="text-gray-300">Rent: ₹{item.rent}</Text>
              <Text className="text-gray-300">Fix: ₹{item.fix}</Text>
              <Text className="text-gray-300">
                Previous Unit: {item.prevUnit}
              </Text>
              <Text className="text-gray-300">Current Unit: 1500</Text>
              <Text className="text-gray-300">Reading: {item.reading}</Text>
              <Text className="text-gray-300">Unit Cost: ₹{item.unitCost}</Text>
              <Text className="text-gray-300">
                Reading Cost: ₹{item.readingCost}
              </Text>

              {/* DIVIDER */}
              <View className="h-px bg-gray-600 my-3" />

              {/* TOTAL */}
              <Text className="text-amber-300 text-xl font-bold">
                Total: ₹{item.total}
              </Text>
            </View>
          )}
        ></FlatList>
      </SafeAreaView>

      {/* ADD ICON */}
      <Pressable
        className="bg-sky-600 w-16 h-16 rounded-xl items-center justify-center shadow-md elevation-xl absolute bottom-0 right-0 mb-25 mr-6"
        onPress={() =>
          router.push({
            pathname: "/bills/NewBillScreen",
            params: { id: id },
          })
        }
      >
        <MaterialIcons name="add" size={28} color="white" />
      </Pressable>
    </View>
  );
};

export default NewUserScreen;
