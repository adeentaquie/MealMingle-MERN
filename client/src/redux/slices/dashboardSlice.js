// src/redux/dashboardSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Initial state for the dashboard
const initialState = {
  mealsShared: 0,
  comments: 0,
  loading: false,
  errorMessage: "",
};

// Redux slice for handling dashboard data
const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // Set dashboard data on successful fetch
    fetchDashboardSuccess: (state, action) => {
      state.mealsShared = action.payload.mealsShared;
      state.comments = action.payload.comments;
      state.loading = false;
      state.errorMessage = "";
    },
    // Handle dashboard fetch error
    fetchDashboardFailure: (state, action) => {
      state.errorMessage = action.payload.message;
      state.loading = false;
    },
    // Set loading state during dashboard fetch
    setLoading: (state) => {
      state.loading = true;
    },
    // Reset the dashboard state
    resetDashboard: (state) => {
      state.mealsShared = 0;
      state.comments = 0;
      state.loading = false;
      state.errorMessage = "";
    },
  },
});

export const { fetchDashboardSuccess, fetchDashboardFailure, setLoading, resetDashboard } = dashboardSlice.actions;
export const selectDashboard = (state) => state.dashboard; // Selector to get dashboard state

export default dashboardSlice.reducer;
