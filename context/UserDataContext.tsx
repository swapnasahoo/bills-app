import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  officeNo: number;
}

export interface BillEntry {
  id: number;
  month: string;
  date: number;
  rent: number;
  fix: number;
  prevUnit: number;
  currUnit: number;
  reading: number;
  unitCost: number;
  paymentMethod: string;
  readingCost: number;
  prevDue: number;
  total: number;
}

interface UserDataContextType {
  users: User[];
  userBills: Partial<Record<number, BillEntry[]>>;
  addUser: (id: number, name: string, officeNo: number) => void;
  deleteUser: (id: number) => void;
  updateUser: (id: number, name: string, officeNo: number) => void;
  addBill: (id: number, entry: BillEntry) => void;
  deleteBill: (userId: number, billId: number) => void;
  updateBill: (userId: number, billId: number, entry: BillEntry) => void;
}

export const UserDataContext = createContext<UserDataContextType>({
  users: [],
  userBills: {},
  addUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
  addBill: () => {},
  deleteBill: () => {},
  updateBill: () => {},
});

function UserDataContextProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [userBills, setUserBills] = useState<
    Partial<Record<number, BillEntry[]>>
  >({});
  const [loaded, setLoaded] = useState(false);

  function addUser(id: number, name: string, officeNo: number) {
    setUsers((prev) => [...prev, { id: id, name: name, officeNo: officeNo }]);
  }

  function deleteUser(id: number) {
    setUsers(users.filter((user) => user.id !== id));

    setUserBills((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }

  function updateUser(id: number, name: string, officeNo: number) {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, name: name, officeNo: officeNo } : user
      )
    );
  }

  function addBill(id: number, entry: BillEntry) {
    setUserBills((prev) => ({
      ...prev,
      [id]: prev[id] ? [...prev[id], entry] : [entry],
    }));
  }

  function deleteBill(userId: number, billId: number) {
    setUserBills((prev) => ({
      ...prev,
      [userId]: (prev[userId] ?? []).filter((bill) => bill.id !== billId),
    }));
  }

  function updateBill(
    userId: number,
    billId: number,
    entry: Partial<BillEntry>
  ) {
    setUserBills((prev) => ({
      ...prev,
      [userId]: (prev[userId] ?? []).map((bill) =>
        bill.id === billId ? { ...bill, ...entry } : bill
      ),
    }));
  }

  // LOAD DATA
  useEffect(() => {
    async function loadData() {
      const savedUsers = await AsyncStorage.getItem("users");
      const savedUserBills = await AsyncStorage.getItem("userBills");

      if (savedUsers) setUsers(JSON.parse(savedUsers));
      if (savedUserBills) setUserBills(JSON.parse(savedUserBills));

      setLoaded(true);
    }
    loadData();
  }, []);

  // SAVE DATA
  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem("users", JSON.stringify(users));
    AsyncStorage.setItem("userBills", JSON.stringify(userBills));
  }, [users, userBills, loaded]);

  return (
    <UserDataContext.Provider
      value={{
        users,
        userBills,
        addUser,
        deleteUser,
        updateUser,
        addBill,
        deleteBill,
        updateBill,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataContextProvider;
