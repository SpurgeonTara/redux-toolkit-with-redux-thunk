import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
    },
    logout(state, action) {
      state.isAuth = false;
    },
  },
});

export const authActions = authSlice.actions;
