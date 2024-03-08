import { cartAction, displayItemAction } from ".";

//load cart data from firebase once the page is reloaded
export const fetchCartData = () => {
  return async(dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-8ad53-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Could not fetch cart data");
      }
      const data = await response.json();

      return data;
    };
    try {
      const cartData=await fetchData();
      // we can recieve and use cart data in the same format as we post it because here we are using put request
      //so the cartdata has an items array and a totalQuantity key so we use replacecart reducer here
      dispatch(cartAction.replaceCart({
        items:cartData.items || [],
        totalQuantity:cartData.totalQuantity
      }))
    } catch (err) {
      dispatch(
        displayItemAction.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed",
        })
      );
    }
  };
};

//we cannot run sideEffects in reducers function hence we are using action creators
//custom action creators
//a function that returns another function
export const sendCartData = (cart) => {
  // here we can run async function and side effects
  return async (dispatch) => {
    dispatch(
      displayItemAction.showNotification({
        status: "pending",
        title: "sending",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-http-8ad53-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items:cart.items,
            totalQuantity:cart.totalQuantity
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        displayItemAction.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent cart data successfully",
        })
      );
    } catch (err) {
      dispatch(
        displayItemAction.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed",
        })
      );
    }
  };
};
