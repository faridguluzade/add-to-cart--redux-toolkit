import { cartActions } from "./cart-slice";
import { uiActions } from "../ui/ui-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        "https://book-db-c9a99-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) throw new Error("Could not fetch cart data");

      const data = await response.json();

      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotifaction({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotifaction({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );
    try {
      const response = await fetch(
        "https://book-db-c9a99-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            item: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }

      dispatch(
        uiActions.showNotifaction({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotifaction({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed",
        })
      );
    }
  };
};
