/* eslint-disable react/no-children-prop */
import { Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./utils/auth/ProtectedRoute";
import Dashboard from "./pages/dashboard/Dashboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute children={<Dashboard />} />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
