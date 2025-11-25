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
        font-family: Inter, -apple-system, BlinkMacSystemFont, Arial, sans-serif;
        background: #eef1f6;
        padding: 40px;
        display: flex;
        justify-content: center;
      }

      .card {
        background: #ffffff;
        width: 420px;
        border-radius: 22px;
        padding: 36px;
        box-shadow: 0 12px 35px rgba(0,0,0,0.08);
      }

      .header {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 6px;
        letter-spacing: -0.5px;
      }

      .sub {
        font-size: 24px;
        color: #0f84fa;
        margin-bottom: 28px;
      }

      .total {
        font-size: 48px;
        font-weight: 700;
        margin: 10px 0 32px;
        letter-spacing: -1px;
      }

      .section {
        margin-bottom: 28px;
      }

      .label {
        font-size: 13px;
        color: #9ca3af;
        text-transform: uppercase;
        margin-bottom: 6px;
        letter-spacing: 0.6px;
      }

      .value {
        font-size: 17px;
        font-weight: 500;
      }

      .row {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #f1f1f3;
        font-size: 16px;
      }

      .status {
        display: inline-block;
        padding: 6px 14px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 999px;
        margin-top: 20px;
        color: #fff;
        background: ${Number(item.paymentMethod) === 0 ? "#ef4444" : "#10b981"};
      }

      .footer {
        text-align: center;
        margin-top: 36px;
        font-size: 12px;
        color: #9ca3af;
      }
    </style>
  </head>

  <body>
    <div class="card">

      <div class="header">${safe(item.month)} Bill</div>
      <div class="sub">Room ${roomNo} • ${userName}</div>

      <div class="total">₹${safe(item.total)}</div>

      <div class="section">
        <div class="label">Invoice Date</div>
        <div class="value">${new Date(item.date).toLocaleDateString(
          "en-GB"
        )}</div>
      </div>

      <div class="label">Details</div>

      <div class="row"><span>Rent</span><span>₹${safe(item.rent)}</span></div>
      <div class="row"><span>Fix</span><span>₹${safe(item.fix)}</span></div>
      <div class="row"><span>Previous Unit</span><span>${safe(
        item.prevUnit
      )}</span></div>
      <div class="row"><span>Current Unit</span><span>${safe(
        item.currUnit
      )}</span></div>
      <div class="row"><span>Reading</span><span>${safe(
        item.reading
      )}</span></div>
      <div class="row"><span>Unit Cost</span><span>₹${safe(
        item.unitCost
      )}</span></div>
      <div class="row"><span>Reading Cost</span><span>₹${safe(
        item.readingCost
      )}</span></div>
      <div class="row"><span>Payment Method</span><span>${finalPaymentMethod}</span></div>

      <span class="status">${
        Number(item.paymentMethod) === 0 ? "UNPAID" : "PAID"
      }</span>
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
