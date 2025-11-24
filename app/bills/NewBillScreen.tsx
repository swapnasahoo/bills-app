import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useState } from "react";
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

const NewBillScreen = () => {
  const [isPrevDue, setIsPrevDue] = useState(false);
  const [selected, setSelected] = useState<DateType>(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const defaultStyles = useDefaultStyles();

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
          <Text className="text-xl text-white font-bold">Add Bill</Text>
        </View>

        {/* FORM */}
        <ScrollView
          contentContainerStyle={{ paddingBottom: 95 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="mt-4 w-full gap-4">
            {/* MONTH PICKER */}
            <Text className="text-white text-lg">Month</Text>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
              items={[
                { label: "January", value: "January" },
                { label: "February", value: "Feburary" },
                { label: "March", value: "March" },
                { label: "April", value: "April" },
                { label: "May", value: "May" },
                { label: "June", value: "June" },
                { label: "July", value: "July" },
                { label: "August", value: "August" },
                { label: "September", value: "September" },
                { label: "October", value: "October" },
                { label: "November", value: "November" },
                { label: "December", value: "December" },
              ]}
              style={{
                inputAndroid: { color: "white", backgroundColor: "#374151" },
                inputIOS: { color: "white", backgroundColor: "#374151" },
                placeholder: { color: "#9ca3af" },
              }}
            />

            {/* DATE FIELD — TAP TO OPEN PICKER */}
            <View>
              <Text className="text-lg text-white mb-1">Date</Text>

              <Pressable
                onPress={() => setOpenDatePicker(true)}
                className="border-2 border-blue-600 p-3 rounded-md bg-gray-700"
              >
                <Text className="text-white text-xl">
                  {selected
                    ? new Date(selected).toLocaleDateString()
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
                        container: { backgroundColor: "#1f2937" },
                        header: { backgroundColor: "#1f2937" },
                        headerText: { color: "white" },

                        weekDaysContainer: { backgroundColor: "#1f2937" },
                        weekDayLabel: { color: "#9ca3af" },

                        dayContainer: {
                          gap: 4,
                        },

                        day: {
                          backgroundColor: "#1f2937",
                          width: 38,
                          borderRadius: 6,
                        },
                        dayLabel: { color: "#e5e7eb" },

                        todayContainer: { backgroundColor: "#2563eb" },
                        todayLabel: { color: "white", fontWeight: "700" },

                        selectedDayLabel: {
                          color: "black",
                          fontWeight: "700",
                        },

                        arrow: { tintColor: "white" },
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
              { label: "Rent", placeholder: "0" },
              { label: "Fix", placeholder: "0" },
              { label: "Previous Unit", placeholder: "0" },
              { label: "Current Unit", placeholder: "0" },
              { label: "Cost per Unit", placeholder: "0" },
            ].map((field, i) => (
              <View key={i} className="w-full gap-1">
                <Text className="text-lg text-white">{field.label}</Text>
                <TextInput
                  placeholder={field.placeholder}
                  placeholderTextColor="#9ca3af"
                  className="text-white text-xl border-2 border-blue-600 p-3 rounded-md w-full bg-gray-700"
                />
              </View>
            ))}

            {/* PREVIOUS DUE */}
            <View className="flex-row gap-2 my-1">
              <Text className="text-lg text-white">Previous Due</Text>
              <BouncyCheckbox
                isChecked={isPrevDue}
                onPress={() => setIsPrevDue(!isPrevDue)}
              />
            </View>

            <TextInput
              placeholder="0"
              placeholderTextColor="#9ca3af"
              className="text-white text-xl border-2 border-blue-600 p-3 rounded-md w-full bg-gray-700"
              style={{ display: isPrevDue ? "flex" : "none" }}
            />

            {/* PAYMENT METHOD */}
            <Text className="text-lg text-white">Payment Method</Text>
            <RNPickerSelect
              onValueChange={(value) => console.log(value)}
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

              <Text className="text-gray-300">Reading: 300</Text>
              <Text className="text-gray-300">Unit Cost: 8</Text>
              <Text className="text-gray-300">Unit: 2400</Text>

              <View className="h-px bg-gray-500 my-2" />

              <Text className="text-amber-300 text-2xl font-bold">
                Total: ₹5600
              </Text>
            </View>

            {/* SUBMIT */}
            <Pressable className="bg-amber-500 py-3 rounded-md mt-6">
              <Text className="text-black text-center text-lg font-semibold">
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
