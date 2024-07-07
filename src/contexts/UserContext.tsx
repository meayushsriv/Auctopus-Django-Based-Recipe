import React, { createContext, useState, ReactNode } from "react";

interface User {
  name: string;
  phone: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  alertMessage: string;
  setAlertMessage: (message: string) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  alertMessage: "",
  setAlertMessage: () => {},
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [alertMessage, setAlertMessage] = useState("");

  return (
    <UserContext.Provider
      value={{ user, setUser, alertMessage, setAlertMessage }}
    >
      {children}
    </UserContext.Provider>
  );
};
