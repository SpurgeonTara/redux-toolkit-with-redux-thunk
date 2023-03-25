import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./uiSlice";

const initialState = {
  items: [],
  totalQuantity: 0,
  changed: false,
  //   totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity += 1;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );
      state.totalQuantity -= 1;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.price;
      }
    },
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    let timeoutId;
    const timoutFunc = () => {
      dispatch(uiActions.hideNotification());
    };
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending Cart Data",
      })
    );
    clearTimeout(timeoutId);
    timeoutId = setTimeout(timoutFunc, 3000);

    const sendRequest = async () => {
      const response = await fetch("YOUR URL", {
        method: "PUT",
        body: JSON.stringify(cart),
      });
      if (!response.ok) {
        throw new Error("Something Went Wrong!!");
      }
      // const responseData = response.json();
      // we are not doing anything with data!!
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success..",
          message: "Sent Cart Data Successfully..",
        })
      );
      clearTimeout(timeoutId);
      timeoutId = setTimeout(timoutFunc, 3000);
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending Cart Data Failed..",
        })
      );
      clearTimeout(timeoutId);
      timeoutId = setTimeout(timoutFunc, 3000);
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    let timeoutId;
    const timoutFunc = () => {
      dispatch(uiActions.hideNotification());
    };
    const fetchData = async () => {
      //   const response = await fetch("Your URL");
      //   if (!response.ok) {
      //     throw new Error("Failed fetching cart data!!");
      //   }
      //   const responseData = await response.json();
      const responseData = {
        items: [
          {
            id: "p1",
            price: 6,
            quantity: 1,
            totalPrice: 6,
            title: "My First Book",
          },
          {
            id: "p2",
            price: 7,
            quantity: 1,
            totalPrice: 7,
            title: "My Second Book",
          },
        ],
        totalQuantity: 2,
        changed: false,
      };
      return responseData;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartSlice.actions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending Cart Data Failed..",
        })
      );
      clearTimeout(timeoutId);
      timeoutId = setTimeout(timoutFunc, 3000);
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
