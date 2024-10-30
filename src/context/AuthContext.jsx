/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContextProvider);
