import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { TitleContextProvider } from "./context/TitleContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <TitleContextProvider>
        <App />
      </TitleContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
