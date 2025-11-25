import { UserDataContext } from "@/context/UserDataContext";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

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

  async function shareBill(item: any) {
    const safe = (v: any, fallback = "N/A") =>
      v === undefined || v === null || v === "" ? fallback : v;

    const userName = safe(foundUser?.name, "Name not available");
    const roomNo = safe(foundUser?.roomNo, "Room number not available");

    let finalPaymentMethod = "";

    switch (Number(item.paymentMethod)) {
      case 0:
        finalPaymentMethod = "None";
        break;
      case 1:
        finalPaymentMethod = "Cash";
        break;
      case 2:
        finalPaymentMethod = "Online";
        break;
      default:
        finalPaymentMethod = "N/A";
    }

    const html = `
  <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body {
          padding: 20px;
          font-family: Arial, sans-serif;
          color: #333;
        }
        h1 {
          text-align: center;
          color: #1e40af;
          margin-bottom: 10px;
        }
        h2 {
          color: #065f46;
        }
        h4 {
          margin: 2px;
          color: #1e40af;
        }
        .section {
          margin-bottom: 15px;
        }
        .row {
          margin: 6px 0;
          font-size: 16px;
        }
        .label {
          font-weight: bold;
        }
        .total-box {
          margin-top: 15px;
          padding: 10px;
          background: #e0f2fe;
          border-radius: 6px;
          border-left: 5px solid #0284c7;
          font-size: 18px;
        }
        hr {
          margin: 15px 0;
        }
      </style>
    </head>

    <body>
      <h1>Bill Summary</h1>

      <h2>${safe(item.month)}</h2>

      <div class="section">
        <h4>User Info:</h4>
        <div class="row"><span class="label">Name:</span> ${userName}</div>
        <div class="row"><span class="label">Room Number:</span> ${roomNo}</div>
        <div class="row"><span class="label">Date:</span> ${safe(
          item.date
        )}</div>
      </div>

      <div class="section">
        <h4>Bill Info:</h4>
        <div class="row"><span class="label">Rent:</span> ₹${safe(
          item.rent,
          "0"
        )}</div>
        <div class="row"><span class="label">Fix:</span> ₹${safe(
          item.fix,
          "0"
        )}</div>
        <div class="row"><span class="label">Previous Unit:</span> ${safe(
          item.prevUnit
        )}</div>
        <div class="row"><span class="label">Current Unit:</span> ${safe(
          item.currUnit
        )}</div>
        <div class="row"><span class="label">Reading:</span> ${safe(
          item.reading
        )}</div>
        <div class="row"><span class="label">Cost per Unit:</span> ₹${safe(
          item.unitCost
        )}</div>
        <div class="row"><span class="label">Reading Cost:</span> ₹${safe(
          item.readingCost
        )}</div>
        <div class="row"><span class="label">Payment Method:</span> ${safe(
          finalPaymentMethod
        )}</div>
      </div>

      <hr />

      <div class="total-box">
        <div class="row"><span class="label">Total:</span> ₹${safe(
          item.total,
          "0"
        )}</div>
        <div class="row"><span class="label">Status:</span> ${
          Number(item.paymentMethod) === 0 ? "Unpaid" : "Paid"
        }</div>
      </div>
    </body>
  </html>
  `;

    // Generate PDF
    const { uri } = await Print.printToFileAsync({ html });

    // Share PDF
    await Sharing.shareAsync(uri);
  }

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

                <Entypo
                  name="share"
                  size={20}
                  color="white"
                  onPress={() => shareBill(item)}
                />

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
                  onPress={() => confirmDeleteBill(Number(id), item.id)}
                />
              </View>

              {/* DETAILS */}
              <Text className="text-gray-300">
                Date: {new Date(item.date).toLocaleDateString("en-GB")}
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
