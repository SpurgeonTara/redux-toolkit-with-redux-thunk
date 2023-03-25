import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice";
import { authSlice } from "./authSlice";

// Now use configureStore instaed of createStore
// it takes an object which contains reducer property.

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    isAuth: authSlice.reducer,
  },
});

export default store;
