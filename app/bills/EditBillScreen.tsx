import { UserDataContext } from "@/context/UserDataContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";

const EditBillScreen = () => {
  const [isPrevDue, setIsPrevDue] = useState(false);
  const [selected, setSelected] = useState<DateType>(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const defaultStyles = useDefaultStyles();

  const { userBills, updateBill } = useContext(UserDataContext);
  const { userId, billId } = useLocalSearchParams();

  const userIdNum = Number(userId);
  const billIdNum = Number(billId);

  const billsForUser = userBills[userIdNum] ?? [];
  const foundBill = billsForUser.find((bill) => bill.id === billIdNum);

  // INPUTS DATA
  const [rent, setRent] = useState(foundBill?.rent ?? "");
  const [fix, setFix] = useState(foundBill?.fix ?? "");
  const [prevUnit, setPrevUnit] = useState(foundBill?.prevUnit ?? "");
  const [currUnit, setCurrUnit] = useState(foundBill?.currUnit ?? "");
  const [costUnit, setCostUnit] = useState(foundBill?.unitCost ?? "");
  const [prevDue, setPrevDue] = useState(foundBill?.prevDue ?? "");
  const [paymentMethod, setPaymentMethod] = useState(
    foundBill?.paymentMethod ?? ""
  );

  const [reading, setReading] = useState(foundBill?.reading ?? 0);
  const [readingCost, setReadingCost] = useState(foundBill?.readingCost ?? 0);
  const [total, setTotal] = useState(foundBill?.total ?? 0);

  useEffect(() => {
    const r = Number(currUnit) - Number(prevUnit);
    const rc = r * Number(costUnit);
    const t =
      Number(rent) + Number(fix) + rc + (isPrevDue ? Number(prevDue || 0) : 0);

    const safeReading = isNaN(r) ? 0 : r;
    const safeReadingCost = isNaN(rc) ? 0 : rc;
    const safeTotal = isNaN(t) ? 0 : t;

    setReading(safeReading);
    setReadingCost(safeReadingCost);
    setTotal(safeTotal);
  }, [rent, fix, prevUnit, currUnit, costUnit, isPrevDue, prevDue]);

  if (!foundBill) return null;
  return (
    <View className="bg-gray-800 flex-1 p-6">
      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center gap-4 mb-2">
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="white"
            onPress={() => router.push("/")}
          />
          <Text className="text-xl text-white font-bold">Edit Bill</Text>
        </View>

        {/* FORM */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 95 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-4 w-full gap-4">
            {/* DATE FIELD — TAP TO OPEN PICKER */}
            <View>
              <Text className="text-lg text-white mb-1">Date</Text>

              <Pressable
                onPress={() => setOpenDatePicker(true)}
                className="border-2 border-blue-600 p-3 rounded-md bg-gray-700"
              >
                <Text className="text-white text-xl">
                  {selected
                    ? new Date(Number(selected)).toLocaleDateString()
                    : "Select Date"}
                </Text>
              </Pressable>

              {/* MODAL DATE PICKER */}
              <Modal visible={openDatePicker} transparent animationType="fade">
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: 20,
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#1f2937",
                      borderRadius: 12,
                      padding: 20,
                    }}
                  >
                    <DateTimePicker
                      mode="single"
                      date={selected}
                      maxDate={new Date()}
                      onChange={({ date }) => {
                        setSelected(date);
                        setOpenDatePicker(false);
                      }}
                      styles={{
                        ...defaultStyles,
                        header: { backgroundColor: "#1f2937" },

                        day: {
                          backgroundColor: "#1f2937",
                          width: 38,
                          borderRadius: 6,
                        },
                      }}
                    />

                    <Pressable
                      onPress={() => setOpenDatePicker(false)}
                      style={{ marginTop: 10, padding: 10 }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "white",
                          fontSize: 16,
                        }}
                      >
                        Close
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>

            {/* OTHER FIELDS */}
            {[
              { label: "Rent", placeholder: "0", change: setRent, value: rent },
              { label: "Fix", placeholder: "0", change: setFix, value: fix },
              {
                label: "Previous Unit",
                placeholder: "0",
                change: setPrevUnit,
                value: prevUnit,
              },
              {
                label: "Current Unit",
                placeholder: "0",
                change: setCurrUnit,
                value: currUnit,
              },
              {
                label: "Cost per Unit",
                placeholder: "0",
                change: setCostUnit,
                value: costUnit,
              },
            ].map((field, i) => (
              <View key={i} className="w-full gap-1">
                <Text className="text-lg text-white">{field.label}</Text>
                <TextInput
                  placeholder={field.placeholder}
                  placeholderTextColor="#9ca3af"
                  className="text-white text-xl border-2 border-blue-600 p-3 rounded-md w-full bg-gray-700"
                  value={field.value.toString()}
                  onChangeText={field.change}
                />
              </View>
            ))}

            {/* PREVIOUS DUE */}
            <View className="flex-row gap-2 my-1">
              <Text className="text-lg text-white">Previous Due</Text>
              <BouncyCheckbox
                isChecked={isPrevDue}
                onPress={() => setIsPrevDue(!isPrevDue)}
                style={{
                  marginLeft: "auto",
                }}
                iconStyle={{
                  borderRadius: 4,
                  borderWidth: 2,
                }}
                innerIconStyle={{
                  borderRadius: 4,
                }}
              />
            </View>

            <TextInput
              placeholder="0"
              placeholderTextColor="#9ca3af"
              className="text-white text-xl border-2 border-blue-600 p-3 rounded-md w-full bg-gray-700"
              style={{ display: isPrevDue ? "flex" : "none" }}
              onChangeText={setPrevDue}
            />

            {/* PAYMENT METHOD */}
            <Text className="text-lg text-white">Payment Method</Text>
            <RNPickerSelect
              onValueChange={(value) => setPaymentMethod(value)}
              items={[
                { label: "Cash", value: "Cash" },
                { label: "Online", value: "Online" },
              ]}
              style={{
                inputAndroid: { color: "white", backgroundColor: "#374151" },
                inputIOS: { color: "white", backgroundColor: "#374151" },
                placeholder: { color: "#9ca3af" },
              }}
            />

            {/* SUMMARY */}
            <View className="bg-gray-700 mt-6 p-4 rounded-lg border border-gray-600">
              <Text className="text-white text-xl font-semibold mb-2">
                Bill Summary
              </Text>

              <Text className="text-gray-300">Unit: {reading}</Text>
              <Text className="text-gray-300">Unit Cost: {costUnit}</Text>
              <Text className="text-gray-300">Unit Cost: {readingCost}</Text>

              <View className="h-px bg-gray-500 my-2" />

              <Text className="text-amber-300 text-2xl font-bold">
                Total: ₹{total}
              </Text>
            </View>

            {/* SUBMIT */}
            <Pressable
              className="bg-amber-500 py-3 rounded-md mt-6"
              onPress={() => {
                const reading = Number(currUnit) - Number(prevUnit);
                const readingCost = reading * Number(costUnit);
                const total =
                  Number(rent) +
                  Number(fix) +
                  readingCost +
                  Number(prevDue || 0);

                const month = new Date(selected).toLocaleDateString("en-US", {
                  month: "long",
                });

                updateBill(userIdNum, billIdNum, {
                  id: Date.now(),
                  month: month,
                  date: new Date(selected).getTime(),
                  rent: Number(rent),
                  fix: Number(fix),
                  prevUnit: Number(prevUnit),
                  currUnit: Number(currUnit),
                  reading: reading,
                  unitCost: Number(costUnit),
                  paymentMethod: paymentMethod,
                  readingCost: readingCost,
                  prevDue: Number(prevDue),
                  total: total,
                });

                router.back();
              }}
            >
              <Text className="text-black text-center text-lg font-semibold">
                Update Bill
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default EditBillScreen;
