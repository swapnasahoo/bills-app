import { createContext, useState } from "react";

interface User {
  id: number;
  name: string;
  roomNo: number;
}

interface BillEntry {
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
  total: number;
}

interface UserDataContextType {
  users: User[];
  userBills: { [key: number]: BillEntry[] };
  addUser: (id: number, name: string, roomNo: number) => void;
  deleteUser: (id: number) => void;
  updateUser: (id: number, name: string, roomNo: number) => void;
  addBill: (id: number, entry: BillEntry) => void;
  deleteBill: (id: number) => void;
}

export const UserDataContext = createContext<UserDataContextType>({
  users: [],
  userBills: {},
  addUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
  addBill: () => {},
  deleteBill: () => {},
});

function UserDataContextProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [userBills, setUserBills] = useState<{ [key: number]: BillEntry[] }>(
    {}
  );

  function addUser(id: number, name: string, roomNo: number) {
    setUsers((prev) => [...prev, { id: id, name: name, roomNo: roomNo }]);
  }

  function deleteUser(id: number) {
    setUsers(users.filter((user) => user.id !== id));
  }

  function updateUser(id: number, name: string, roomNo: number) {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, name: name, roomNo: roomNo } : user
      )
    );
  }

  function addBill(id: number, entry: BillEntry) {
    setUserBills((prev) => ({
      ...prev,
      [id]: prev[id] ? [...prev[id], entry] : [entry],
    }));
  }

  function deleteBill(id: number) {
    setUserBills((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  }

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
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataContextProvider;
