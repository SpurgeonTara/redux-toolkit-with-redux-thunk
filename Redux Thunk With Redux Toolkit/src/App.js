import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
// import { uiActions } from "./store/uiSlice";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cartSlice";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

let isInitial = true;

function App() {
  const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  // send HTTP request when cart changes to add the cart items to db..

  // useEffect(() => {
  //   let timeoutId;
  //   const timoutFunc = () => {
  //     dispatch(uiActions.hideNotification());
  //   };

  //   const sendCartData = async () => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "pending",
  //         title: "Sending",
  //         message: "Sending Cart Data",
  //       })
  //     );

  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(timoutFunc, 3000);
  //     const response = await fetch("YOUR URL", {
  //       method: "PUT",
  //       body: JSON.stringify(cart),
  //     });
  //     // const response = {
  //     //   ok: true,
  //     // };
  //     if (!response.ok) {
  //       throw new Error("Something Went Wrong!!");
  //     }
  //     // const responseData = response.json();
  //     // we are not doing anything with data!!

  //     dispatch(
  //       uiActions.showNotification({
  //         status: "success",
  //         title: "Success..",
  //         message: "Sent Cart Data Successfully..",
  //       })
  //     );
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(timoutFunc, 3000);
  //   };
  //   // if (isInitial) {
  //   //   isInitial = false;
  //   //   return;
  //   // }
  //   sendCartData().catch((error) => {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: "error",
  //         title: "Error",
  //         message: "Sending Cart Data Failed..",
  //       })
  //     );
  //     clearTimeout(timeoutId);
  //     timeoutId = setTimeout(timoutFunc, 3000);
  //   });
  // }, [cart, dispatch]);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [dispatch, cart]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
