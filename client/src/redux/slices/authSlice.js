// src/redux/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user authentication
const initialState = {
  userId: null,
  isAuthenticated: false,
  errorMessage: "",
  loading: false,
};

// Redux slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user data on login
    loginSuccess: (state, action) => {
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
      state.errorMessage = "";
      state.loading = false;
    },
    // Handle login error
    loginFailure: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loading = false;
    },
    // Set loading state during login
    setLoading: (state) => {
      state.loading = true;
    },
    // Logout user and reset state
    logout: (state) => {
      state.userId = null;
      state.isAuthenticated = false;
      state.errorMessage = "";
      state.loading = false;
    },
  },
});

export const { loginSuccess, loginFailure, setLoading, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth; // Selector to get auth state

export default authSlice.reducer;
