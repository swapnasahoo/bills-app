import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";

const NewBillScreen = () => {
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

        {/* ADD BILL FORM */}
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 95,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* INPUT FIELDS */}
          <View className="mt-4 w-full gap-4">
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
                inputAndroid: {
                  color: "white",
                  backgroundColor: "#374151",
                },
                inputIOS: {
                  color: "white",
                  backgroundColor: "#374151",
                },
                placeholder: {
                  color: "#9ca3af",
                },
              }}
            />
            {[
              { label: "Date", placeholder: "12/11/2025" },
              { label: "Rent", placeholder: "0" },
              { label: "Fix", placeholder: "0" },
              {
                label: "Previous Reading",
                placeholder: "0",
              },
              {
                label: "Current Reading",
                placeholder: "0",
              },
              {
                label: "Reading Cost (per unit)",
                placeholder: "0",
              },
            ].map((field, idx) => (
              <View key={idx} className="w-full gap-1">
                <Text className="text-lg text-white">{field.label}</Text>

                <TextInput
                  placeholder={field.placeholder}
                  placeholderTextColor="#9ca3af"
                  className="text-white text-xl border-2 border-blue-600 
          p-3 rounded-md w-full bg-gray-700"
                />
              </View>
            ))}

            {/* SUMMARY CARD */}
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

            {/* SUBMIT BUTTON */}
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
