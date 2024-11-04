import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { TitleContextProvider } from "./context/TitleContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <TitleContextProvider>
          <App />
        </TitleContextProvider>
      </AuthContextProvider>
    </Router>
  </StrictMode>
);
