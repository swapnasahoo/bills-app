import { UserDataContext } from "@/context/UserDataContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  Alert,
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

const NewBillScreen = () => {
  const [isPrevDue, setIsPrevDue] = useState(false);
  const [selected, setSelected] = useState<DateType>(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const defaultStyles = useDefaultStyles();

  const { addBill } = useContext(UserDataContext);
  const { id } = useLocalSearchParams();

  // INPUTS DATA
  const [rent, setRent] = useState("");
  const [fix, setFix] = useState("");
  const [prevUnit, setPrevUnit] = useState("");
  const [currUnit, setCurrUnit] = useState("");
  const [costUnit, setCostUnit] = useState("");
  const [prevDue, setPrevDue] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [reading, setReading] = useState(0);
  const [readingCost, setReadingCost] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const r = Number(currUnit) - Number(prevUnit);
    const rc = r * Number(costUnit);
    const t =
      Number(rent) + Number(fix) + rc + (isPrevDue ? Number(prevDue || 0) : 0);

    setReading(isNaN(r) ? 0 : r);
    setReadingCost(isNaN(rc) ? 0 : rc);
    setTotal(isNaN(t) ? 0 : t);
  }, [rent, fix, prevUnit, currUnit, costUnit, isPrevDue, prevDue]);

  function clearFields() {
    setRent("");
    setFix("");
    setPrevUnit("");
    setCurrUnit("");
    setCostUnit("");
    setPrevDue("");
    setIsPrevDue(false);
    setPaymentMethod("");
  }

  return (
    <View className="bg-[#0d1117] flex-1 p-6">
      <SafeAreaView className="flex-1">
        {/* HEADER */}
        <View className="flex-row items-center gap-4 mb-2">
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="#60a5fa"
            onPress={() => router.push("/")}
          />

          <View className="flex-row items-center justify-between flex-1">
            <Text className="text-xl text-white font-bold">Add Bill</Text>

            <Pressable
              className="bg-[#f87171] px-6 py-1 rounded-md"
              onPress={clearFields}
            >
              <Text className="text-white font-semibold text-lg">Clear</Text>
            </Pressable>
          </View>
        </View>

        {/* FORM */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 95 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-4 w-full gap-4">
            {/* DATE FIELD */}
            <View>
              <Text className="text-lg text-white mb-1">Date</Text>

              <Pressable
                onPress={() => setOpenDatePicker(true)}
                className="border border-[#1f2937] p-3 rounded-md bg-[#111827]"
              >
                <Text className="text-white text-xl">
                  {selected
                    ? new Date(Number(selected)).toLocaleDateString()
                    : "Select Date"}
                </Text>
              </Pressable>

              {/* MODAL DATE PICKER */}
              <Modal visible={openDatePicker} transparent animationType="slide">
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
                      backgroundColor: "#111827",
                      borderRadius: 12,
                      padding: 20,
                      borderWidth: 1,
                      borderColor: "#1f2937",
                    }}
                  >
                    <DateTimePicker
                      mode="single"
                      date={selected}
                      maxDate={new Date()}
                      weekdaysFormat="short"
                      onChange={({ date }) => {
                        setSelected(date);
                        setOpenDatePicker(false);
                      }}
                      styles={{
                        ...defaultStyles,
                        header: { backgroundColor: "#111827" },
                        day: {
                          backgroundColor: "#111827",
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
                          color: "#60a5fa",
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
              { label: "Rent", value: rent, change: setRent },
              { label: "Fix", value: fix, change: setFix },
              { label: "Previous Unit", value: prevUnit, change: setPrevUnit },
              { label: "Current Unit", value: currUnit, change: setCurrUnit },
              { label: "Rate per Unit", value: costUnit, change: setCostUnit },
            ].map((field, i) => (
              <View key={i} className="w-full gap-1">
                <Text className="text-lg text-white">{field.label}</Text>
                <TextInput
                  placeholder="0"
                  placeholderTextColor="#9ca3af"
                  className="text-white text-xl border border-[#1f2937] p-3 rounded-md w-full bg-[#111827]"
                  value={field.value}
                  onChangeText={(text) =>
                    field.change(text.replace(/[-.,]/g, ""))
                  }
                  keyboardType="numeric"
                />
              </View>
            ))}

            {/* PREVIOUS DUE */}
            <View className="flex-row gap-2 my-1">
              <Text className="text-lg text-white mr-auto">Previous Due</Text>

              <BouncyCheckbox
                isChecked={isPrevDue}
                onPress={() => setIsPrevDue(!isPrevDue)}
                fillColor="#60a5fa"
                unFillColor="#111827"
                iconStyle={{
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: "#60a5fa",
                }}
                innerIconStyle={{
                  borderRadius: 4,
                }}
              />
            </View>

            {isPrevDue && (
              <TextInput
                placeholder="0"
                placeholderTextColor="#9ca3af"
                className="text-white text-xl border border-[#1f2937] p-3 rounded-md w-full bg-[#111827]"
                onChangeText={setPrevDue}
                keyboardType="numeric"
              />
            )}

            {/* PAYMENT METHOD */}
            <Text className="text-lg text-white">Payment Method</Text>

            <RNPickerSelect
              onValueChange={(value) => setPaymentMethod(value)}
              items={[
                { label: "None", value: "0" },
                { label: "Cash", value: "1" },
                { label: "Online", value: "2" },
              ]}
              Icon={() => (
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color="#9ca3af"
                />
              )}
              useNativeAndroidPickerStyle={false}
              style={{
                inputAndroid: {
                  color: "white",
                  backgroundColor: "#111827",
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#1f2937",
                },
                inputIOS: {
                  color: "white",
                  backgroundColor: "#111827",
                  paddingVertical: 12,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#1f2937",
                },
                placeholder: {
                  color: "#9ca3af",
                },
                iconContainer: {
                  top: 12,
                  right: 12,
                },
              }}
            />

            {/* SUMMARY */}
            <View className="bg-[#111827] mt-6 p-4 rounded-lg border border-[#1f2937]">
              <Text className="text-white text-xl font-semibold mb-2">
                Bill Overview
              </Text>

              <Text className="text-gray-300">Units Used: {reading}</Text>
              <Text className="text-gray-300">Rate per Unit: {costUnit}</Text>
              <Text className="text-gray-300">
                Energy Charges: {readingCost}
              </Text>

              <View className="h-px bg-[#374151] my-2" />

              <Text className="text-[#fbbf24] text-2xl font-bold">
                Total: ₹{total}
              </Text>
            </View>

            {/* SUBMIT */}
            <Pressable
              className="bg-[#60a5fa] py-3 rounded-md mt-6"
              onPress={() => {
                if (
                  !rent ||
                  !prevUnit ||
                  !currUnit ||
                  !costUnit ||
                  !paymentMethod
                ) {
                  Alert.alert("Error", "Please fill all the required fields.", [
                    { text: "OK", style: "cancel" },
                  ]);
                  return;
                }

                const reading = Number(currUnit) - Number(prevUnit);
                const readingCost = reading * Number(costUnit);
                const total =
                  Number(rent) +
                  Number(fix) +
                  readingCost +
                  Number(prevDue || 0);

                const month = new Date(selected as any).toLocaleDateString(
                  "en-US",
                  { month: "long" }
                );

                addBill(Number(id), {
                  id: Date.now(),
                  month,
                  date: new Date(selected as any).getTime(),
                  rent: Number(rent),
                  fix: Number(fix),
                  prevUnit: Number(prevUnit),
                  currUnit: Number(currUnit),
                  reading,
                  unitCost: Number(costUnit),
                  paymentMethod,
                  readingCost,
                  prevDue: Number(prevDue),
                  total,
                });

                router.back();
              }}
            >
              <Text className="text-white text-center text-lg font-semibold">
                Add Bill
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default NewBillScreen;
