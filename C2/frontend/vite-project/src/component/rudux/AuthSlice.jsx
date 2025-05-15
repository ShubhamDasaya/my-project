import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely parse JSON from localStorage
const getUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

// Initial state
const initialState = {
  user: getUserFromStorage(),
  contact: localStorage.getItem("contact") || null,
  userId: localStorage.getItem("userId") || null,
  token: localStorage.getItem("token") || null,
  isLoggedIn: !!localStorage.getItem("token"),
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log("Full Login Payload:", action.payload);

      const { user, token, contact } = action.payload;
      console.log("Received user in loginSuccess:", user);

      state.user = user || null;
      state.contact = contact || null;
      state.userId = user && user._id ? user._id : null;
      state.token = token || null;
      state.isLoggedIn = !!token;

      // Store values in localStorage safely
      localStorage.setItem("user", JSON.stringify(user || {}));
      localStorage.setItem("userId", user && user._id ? user._id : "");
      localStorage.setItem("token", token || "");
      localStorage.setItem("contact", contact || "");

      console.log("Stored userId in localStorage:", localStorage.getItem("userId"));
    },
    logout: (state) => {
      console.log("Logging out...");

      state.user = null;
      state.userId = null;
      state.token = null;
      state.contact = null;
      state.isLoggedIn = false;

      // Remove all stored authentication data
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("contact");
    },
    setUserId: (state, action) => {
      console.log("Setting userId:", action.payload);
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
  },
});

// Export actions and reducer
export const { loginSuccess, logout, setUserId } = AuthSlice.actions;
export default AuthSlice.reducer;
