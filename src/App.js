import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/cart/cart-action";
import { fetchCartData } from "./store/cart/cart-action";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const { cartIsVisible: showCart, notifaction } = useSelector(
    (state) => state.ui
  );
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartData());
  }, []);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart]);

  return (
    <>
      {notifaction && <Notification {...notifaction} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
