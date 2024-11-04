import axios from "axios";

const parent_api = "http://localhost:8000/api/v1/auth";

export const SignUpApi = async ({ username, email, password }) => {
  try {
    if (!username || !email || !password) {
      console.error(
        "Username, Email, and Password are required for SIGNUP_API"
      );
      return;
    }

    const requestBody = { username, email, password };
    const signUpResponse = await axios.post(
      `${parent_api}/register`,
      requestBody
    );

    if (signUpResponse && signUpResponse.data) {
      console.log("Signup API Successful:", signUpResponse.data);

      // Automatically log in the user after a successful signup
      const logInRequestBody = { email, password };
      const logInResponse = await axios.post(
        `${parent_api}/login`,
        logInRequestBody
      );

      if (logInResponse && logInResponse.data.token) {
        console.log("Login API Successful:", logInResponse.data);
        // Store the token in localStorage
        localStorage.setItem("token", logInResponse.data.token);
      } else {
        console.error("No token found in login response");
      }

      return signUpResponse.data;
    }
  } catch (err) {
    console.error("Signup API Failed:", err);
    throw err;
  }
};

export const loginApi = async ({ email, password }) => {
  try {
    if (!email || !password) {
      console.error("Email and Password are required for Login API");
      return;
    }

    const logInRequestBody = { email, password };
    const logInResponse = await axios.post(
      `${parent_api}/login`,
      logInRequestBody
    );

    if (logInResponse && logInResponse.data.token) {
      console.log("Login API Successful:", logInResponse.data);
      // Store the token in localStorage
      localStorage.setItem("token", logInResponse.data.token);
    } else {
      console.error("No token found in login response");
    }

    return logInResponse.data;
  } catch (err) {
    console.error("Login API Failed:", err);
    throw err;
  }
};

export const logoutApi = async () => {
  try {
    localStorage.removeItem("token"); // Remove token from localStorage
    console.log("User logged out successfully");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};
