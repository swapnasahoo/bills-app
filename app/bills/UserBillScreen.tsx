import { UserDataContext } from "@/context/UserDataContext";
import { shareBill } from "@/utils/shareBill";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NewUserScreen = () => {
  const { id } = useLocalSearchParams();
  const { users, userBills, deleteBill } = useContext(UserDataContext);

  const foundUser = users.find((user) => user.id === Number(id));

  if (!foundUser) return null;

  function confirmDeleteBill(userId: number, billId: number) {
    Alert.alert("Delete Bill", "Are you sure you want to delete this bill?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteBill(userId, billId);
        },
      },
    ]);
  }

  return (
    <View className="bg-[#0d1117] flex-1 p-6">
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
          contentContainerStyle={{
            paddingBottom: 95,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="bg-gray-900 px-5 py-4 rounded-xl my-3 shadow-md border border-gray-800">
              {/* MONTH + CONTROL ICONS */}
              <View className="flex-row items-center mb-2">
                <Text className="text-xl text-white font-semibold mr-auto tracking-wide">
                  {item.month}
                </Text>

                <Entypo
                  name="share"
                  size={20}
                  color="#60a5fa" // soft blue
                  onPress={() => shareBill(foundUser, item)}
                />

                <Feather
                  name="edit"
                  size={20}
                  color="#34d399" // mint green
                  onPress={() => {
                    router.push({
                      pathname: "/bills/EditBillScreen",
                      params: { userId: id, billId: item.id },
                    });
                  }}
                  style={{ marginLeft: 12 }}
                />

                <Feather
                  name="trash-2"
                  size={20}
                  color="#f87171" // warm red
                  onPress={() => confirmDeleteBill(Number(id), item.id)}
                  style={{ marginLeft: 12 }}
                />
              </View>

              {/* DETAILS */}
              <Text className="text-gray-400">
                Date: {new Date(item.date).toLocaleDateString("en-GB")}
              </Text>

              <Text className="text-gray-300 font-medium">
                Rent: ₹{item.rent}
              </Text>
              <Text className="text-gray-300 font-medium">
                Fix: ₹{item.fix}
              </Text>
              <Text className="text-gray-400">
                Previous Unit: {item.prevUnit}
              </Text>
              <Text className="text-gray-400">
                Current Unit: {item.currUnit}
              </Text>
              <Text className="text-gray-400">Reading: {item.reading}</Text>
              <Text className="text-gray-400">Unit Cost: ₹{item.unitCost}</Text>
              <Text className="text-gray-300 font-medium">
                Reading Cost: ₹{item.readingCost}
              </Text>
              <Text
                style={{
                  color: "#d1d5dc",
                  fontWeight: 500,
                  display: item.prevDue === 0 ? "none" : "flex",
                }}
              >
                Previous Due: ₹{item.prevDue}
              </Text>

              {/* DIVIDER */}
              <View className="h-px bg-gray-700 my-3" />

              {/* TOTAL + BILL STATUS */}
              <View className="flex-row items-center">
                <Text className="text-amber-400 text-2xl font-bold mr-auto">
                  ₹{item.total}
                </Text>

                <View
                  className={`px-5 py-1.5 rounded-md ${
                    Number(item.paymentMethod) === 0
                      ? "bg-red-500/20 border border-red-500/40"
                      : "bg-green-500/20 border border-green-500/40"
                  }`}
                >
                  <Text
                    className={`text-sm font-semibold tracking-wide ${
                      Number(item.paymentMethod) === 0
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {Number(item.paymentMethod) === 0 ? "UNPAID" : "PAID"}
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
