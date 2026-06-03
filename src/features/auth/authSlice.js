import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");

const initialState = {
  isAuthenticated: !!savedUser,
  user: savedUser
    ? JSON.parse(savedUser)
    : null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (state, action) => {
      const userData = action.payload;

      state.isAuthenticated = true;
      state.user = userData;

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;

      localStorage.removeItem("user");
    },

    updateProfile: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(state.user)
      );
    },
  },
});

export const {
  login,
  logout,
  updateProfile,
} = authSlice.actions;

export default authSlice.reducer;