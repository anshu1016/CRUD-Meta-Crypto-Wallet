/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check localStorage for a token and set initial state
    return localStorage.getItem("token") ? true : false;
  });

  useEffect(() => {
    // Optionally, you can check for token on component mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
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

export const useAuth = () => useContext(AuthContext);
