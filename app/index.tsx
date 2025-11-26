import { UserDataContext } from "@/context/UserDataContext";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { users, deleteUser } = useContext(UserDataContext);
  const [searchQuery, setSearchQuery] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sortMode, setSortMode] = useState<"asc" | "desc" | null>(null);

  const query = searchQuery.toLowerCase().trim();

  let filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().trim().includes(query) ||
      user.officeNo.toString().includes(query)
  );

  if (sortMode === "asc") {
    filteredUsers = [...filteredUsers].sort((a, b) => a.officeNo - b.officeNo);
  }

  if (sortMode === "desc") {
    filteredUsers = [...filteredUsers].sort((a, b) => b.officeNo - a.officeNo);
  }

  function confirmDeleteUser(id: number, name: string) {
    Alert.alert(
      "Delete User",
      `Are you sure you want to delete this user?\nThis will clear all the data of ${name}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteUser(id),
        },
      ]
    );
  }

  return (
    <GestureHandlerRootView>
      <View className="bg-[#0d1117] flex-1 p-6">
        <StatusBar style="light" />

        <SafeAreaView className="flex-1">
          {/* HEADER */}
          <View className="flex-row items-center">
            <Text className="text-white font-bold text-4xl">Bills</Text>

            <TextInput
              placeholder="Search"
              placeholderTextColor="#9ca3af"
              className="text-white text-xl p-2 w-[80%] 
                     border border-[#1f2937] bg-[#111827] 
                     rounded-md ml-4"
              onChangeText={setSearchQuery}
            />
          </View>

          {/* LIST */}
          <View className="flex-row items-center mt-8">
            <Text className="text-gray-300 text-xl font-semibold">
              Total: {filteredUsers.length}
            </Text>

            {/* SORT */}
            <Pressable
              className="flex-row gap-2 items-center bg-gray-400/20 
          border border-gray-400/20 rounded-md px-6 py-1 ml-auto"
              onPress={() => bottomSheetRef.current?.expand()}
            >
              <MaterialIcons name="sort" size={20} color="white" />
              <Text className="text-lg text-gray-300 font-semibold">Sort</Text>
            </Pressable>
          </View>

          <FlatList
            data={filteredUsers}
            keyExtractor={(user) => user.id.toString()}
            contentContainerStyle={{
              paddingBottom: 95,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                className="flex-row items-center gap-4 mt-4
                       bg-[#111827] px-6 h-20 rounded-md 
                       border border-[#1f2937]"
                onPress={() =>
                  router.push({
                    pathname: "/bills/UserBillScreen",
                    params: { id: item.id },
                  })
                }
              >
                {/* OFFICE BOX */}
                <View className="bg-[#1f2937] p-4 w-15 h-15 rounded-md justify-center items-center">
                  <Text className="text-white text-lg font-semibold">
                    {item.officeNo}
                  </Text>
                </View>

                <Text className="text-gray-300 text-2xl font-semibold mr-auto">
                  {item.name}
                </Text>

                <Feather
                  name="edit"
                  size={20}
                  color="#34d399" // matching actionEdit
                  onPress={() =>
                    router.push({
                      pathname: "/user/UserEditScreen",
                      params: { id: item.id },
                    })
                  }
                />

                <Feather
                  name="trash-2"
                  size={20}
                  color="#f87171" // matching actionDelete
                  onPress={() => confirmDeleteUser(item.id, item.name)}
                />
              </Pressable>
            )}
          />
        </SafeAreaView>

        {/* ADD ICON */}
        <Pressable
          className="bg-[#60a5fa] w-16 h-16 rounded-xl items-center justify-center 
                 absolute bottom-0 right-0 mb-25 mr-6"
          onPress={() => router.push("/user/NewUserScreen")}
        >
          <MaterialIcons name="add" size={28} color="white" />
        </Pressable>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["25%", "50%"]}
        index={-1}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: "#1f2937",
        }}
        handleIndicatorStyle={{
          backgroundColor: "#475569",
        }}
      >
        <BottomSheetView
          style={{
            flex: 1,
            backgroundColor: "#1f2937",
            paddingLeft: 30,
            paddingTop: 20,
          }}
        >
          <View
            className="gap-2
          "
          >
            {/* ASCENDING */}
            <View className="flex-row gap-2">
              <BouncyCheckbox
                isChecked={sortMode === "asc"}
                onPress={() => setSortMode(sortMode === "asc" ? null : "asc")}
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
              <Text className="text-white text-lg">
                Room Number (Low → High)
              </Text>
            </View>

            {/* DESECNDING */}
            <View className="flex-row gap-2">
              <BouncyCheckbox
                isChecked={sortMode === "desc"}
                onPress={() => setSortMode(sortMode === "desc" ? null : "desc")}
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
              <Text className="text-white text-lg">
                Room Number (High → Low)
              </Text>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
