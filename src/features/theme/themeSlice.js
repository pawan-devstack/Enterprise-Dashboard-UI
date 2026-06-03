import { createSlice } from "@reduxjs/toolkit";

const savedTheme =
  localStorage.getItem("darkMode");

const initialState = {
  darkMode:
    savedTheme === "true" ? true : false,
};

const themeSlice = createSlice({
  name: "theme",

  initialState,

  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;

      localStorage.setItem(
        "darkMode",
        state.darkMode
      );
    },
  },
});

export const { toggleTheme } =
  themeSlice.actions;

export default themeSlice.reducer;