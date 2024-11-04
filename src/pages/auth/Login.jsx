/* eslint-disable react/no-unescaped-entities */
// Login.js
import { useState } from "react";
import * as Yup from "yup";
import SharedInput from "./SharedInput";
import { loginApi } from "@/utils/auth/authApi";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid.").required("Email is required."),
  password: Yup.string().required("Password is required."),
});

const Login = () => {
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await LoginSchema.validate({ email, password }, { abortEarly: false });
      const data = await loginApi({ email, password });
      if (data) {
        setIsLoggedIn(true);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (err) {
      if (err.name === "ValidationError") {
        const newErrors = {};
        err.inner.forEach((error) => {
          newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error logging in:", err);
        toast.error("Error logging in. Please try again.");
      }
    }
  };

  const handleSignUpRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#7A1CAC]">
      <div className="p-8 rounded-lg shadow-lg bg-[#2E073F] w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#EBD3F8]">
          Log In
        </h2>
        <form onSubmit={handleLogin}>
          <SharedInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="Enter your email"
            error={errors.email}
          />
          <SharedInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            placeholder="Enter your password"
            error={errors.password}
          />
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#AD49E1] text-[#2E073F] font-bold rounded-lg hover:bg-[#EBD3F8] transition duration-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-[#EBD3F8]">Don't have an account?</span>
          <button
            onClick={handleSignUpRedirect}
            className="mt-2 w-full py-2 bg-[#EBD3F8] text-[#2E073F] font-bold rounded-lg hover:bg-[#AD49E1] transition duration-300"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
