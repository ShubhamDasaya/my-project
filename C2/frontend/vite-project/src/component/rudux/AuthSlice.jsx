import { createSlice } from "@reduxjs/toolkit";

//  Helper function to safely parse JSON
const getUserFromStorage = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

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
      console.log(" Full Login Payload:", action.payload);

      state.user = action.payload.user;
      state.contact = action.payload.contact || "No Contact"; // Fix: Default value
      state.userId = action.payload.user?._id || null;
      state.token = action.payload.token;
      state.isLoggedIn = true;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      if (action.payload.user?._id) {
        localStorage.setItem("userId", action.payload.user._id);
      }
      localStorage.setItem("token", action.payload.token);

      if (action.payload.contact) {
        localStorage.setItem("contact", action.payload.contact);
      }
    },
    logout: (state) => {
      console.log(" Logging out...");

      state.user = null;
      state.userId = null;
      state.token = null;
      state.contact = null;
      state.isLoggedIn = false;

      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("contact"); // Fixed typo
    },
    setUserId: (state, action) => {
      console.log(" Setting userId:", action.payload);
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
  },
});

// Export the actions
export const { loginSuccess, logout, setUserId } = AuthSlice.actions;
export default AuthSlice.reducer;
