import React, { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData, sendCartData } from "./components/store/cart-actions";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const show = useSelector((state) => state.displayItem.showCart);
  //whenever the cart state does change we can send a http request to firebase
  const cart = useSelector((state) => state.cart); // this will give access to cart state

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.displayItem.notification);

  //useEffect to watch for changes in our cart state
  //useEffect re-runs whenever some dependency changes
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
  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {show && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
