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
}

export const UserDataContext = createContext<UserDataContextType>({
  users: [],
  userBills: {},
  addUser: () => {},
});

function UserDataContextProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [userBills, setUserBills] = useState({});

  function addUser(id: number, name: string, roomNo: number) {
    setUsers((prev) => [...prev, { id: id, name: name, roomNo: roomNo }]);
  }

  return (
    <UserDataContext.Provider value={{ users, userBills, addUser }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataContextProvider;
