// Home.js

import { useAuth } from "@/context/AuthContext";
import { logoutApi } from "@/utils/auth/authApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutApi(); // Call the logout function
    setIsLoggedIn(false); // Update the auth context
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default Home;
