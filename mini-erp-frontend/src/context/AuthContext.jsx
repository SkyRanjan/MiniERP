import { createContext, useContext, useState } from "react";
import { ROLES } from "../constants/roles";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // TEMP: simulate logged-in user
  const [user] = useState({
    username: "admin",
    role: ROLES.ADMIN,
    // role: ROLES.STORE_MANAGER // change to STORE_MANAGER to test
  });

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
