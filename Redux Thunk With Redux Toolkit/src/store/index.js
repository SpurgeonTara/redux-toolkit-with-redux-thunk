import { configureStore } from "@reduxjs/toolkit";
import ui from "./uiSlice";
import cart from "./cartSlice";

const store = configureStore({
  reducer: {
    ui: ui.reducer,
    cart: cart.reducer,
  },
});

export default store;
