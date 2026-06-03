import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },

    addUser: (state, action) => {
      state.users.unshift(action.payload);
    },

    updateUser: (state, action) => {
      state.users = state.users.map((user) =>
        user.id === action.payload.id
          ? action.payload
          : user
      );
    },

    deleteUser: (state, action) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload
      );
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  setLoading,
  setError,
} = usersSlice.actions;

export default usersSlice.reducer;