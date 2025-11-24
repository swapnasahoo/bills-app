import { UserDataContext } from "@/context/UserDataContext";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";

import { useContext } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewUserScreen = () => {
  const { id } = useLocalSearchParams();
  const { users, userBills, deleteBill } = useContext(UserDataContext);

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
              {/* MONTH + CONTROL ICONS */}
              <View className="flex-row gap-4">
                <Text className="text-xl text-white font-semibold mb-1 mr-auto">
                  {item.month}
                </Text>

                <Feather
                  name="edit"
                  size={20}
                  color="white"
                  onPress={() => {
                    router.push({
                      pathname: "/bills/EditBillScreen",
                      params: { userId: id, billId: item.id },
                    });
                  }}
                />

                <Feather
                  name="trash-2"
                  size={20}
                  color="#ff0505"
                  onPress={() => deleteBill(Number(id), item.id)}
                />
              </View>

              {/* DETAILS */}
              <Text className="text-gray-300">
                Date: {new Date(item.id).toLocaleDateString("en-GB")}
              </Text>
              <Text className="text-gray-300">Rent: ₹{item.rent}</Text>
              <Text className="text-gray-300">Fix: ₹{item.fix}</Text>
              <Text className="text-gray-300">
                Previous Unit: {item.prevUnit}
              </Text>
              <Text className="text-gray-300">
                Current Unit: {item.currUnit}
              </Text>
              <Text className="text-gray-300">Reading: {item.reading}</Text>
              <Text className="text-gray-300">Unit Cost: ₹{item.unitCost}</Text>
              <Text className="text-gray-300">
                Reading Cost: ₹{item.readingCost}
              </Text>

              {/* DIVIDER */}
              <View className="h-px bg-gray-600 my-3" />

              {/* TOTAL + BILL STATUS */}
              <View className="flex-row">
                <Text className="text-amber-300 text-xl font-bold mr-auto">
                  Total: ₹{item.total}
                </Text>

                <View
                  className={`${
                    Number(item.paymentMethod) === 0
                      ? "bg-red-400"
                      : "bg-green-400"
                  } px-8 py-1 rounded-md`}
                >
                  <Text className="text-lg">
                    {Number(item.paymentMethod) === 0 ? "Unpaid" : "Paid"}
                  </Text>
                </View>
              </View>
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
