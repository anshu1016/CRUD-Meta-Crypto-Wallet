/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";

export const TitleContext = createContext();

export const TitleContextProvider = ({ children }) => {
  return <div>{children}</div>;
};

export const useTitle = () => useContext(TitleContext);
