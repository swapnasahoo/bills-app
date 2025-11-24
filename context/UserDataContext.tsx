import { createContext, useState } from "react";

interface User {
  id: number;
  name: string;
  roomNo: number;
}

interface BillEntry {
  date: number;
  rent: number;
  fix: number;
  prevReading: number;
  currReaading: number;
  reading: number;
  unitCost: number;
  readingCost: number;
  total: number;
}

interface UserDataContextType {
  users: User[];
  userBills: { [key: number]: BillEntry[] };
  addUser: (id: number, name: string, roomNo: number) => void;
  deleteUser: (id: number) => void;
  updateUser: (id: number, name: string, roomNo: number) => void;
}

export const UserDataContext = createContext<UserDataContextType>({
  users: [],
  userBills: {},
  addUser: () => {},
  deleteUser: () => {},
  updateUser: () => {},
});

function UserDataContextProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [userBills, setUserBills] = useState({});

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

  return (
    <UserDataContext.Provider
      value={{ users, userBills, addUser, deleteUser, updateUser }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataContextProvider;
