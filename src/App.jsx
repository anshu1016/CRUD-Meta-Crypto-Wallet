/* eslint-disable react/no-children-prop */
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./utils/auth/ProtectedRoute";
import Home from "./pages/dashboard/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute children={<Home />} />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
