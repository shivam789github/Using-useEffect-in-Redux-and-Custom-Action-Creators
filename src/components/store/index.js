import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    //items in the cart
    items: [],
    //total quantity of items summed up
    totalQuantity: 0,
    changed:false
  },
  reducers: {
    // replace the frontend cart with the cart we are loading from the firebase
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      //check if the item is already part of the array, if it is, then increase the existing item and if not, push the new item to cart
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed=true
      if (!existingItem) {
        state.items.push({
          //we will push an object containing item properties
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      //here we are adding the payload to action-id of item to be removed
      const id = action.payload;
      //found that item by id that we added to payload
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed=true
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity = existingItem.quantity - 1;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

const initialDisplayCartState = {
  showCart: false,
  notification: null,
};

export const displayCartSlice = createSlice({
  name: "productCart",
  initialState: initialDisplayCartState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});



const store = configureStore({
  reducer: { displayItem: displayCartSlice.reducer, cart: cartSlice.reducer },
});

//action creators
export const displayItemAction = displayCartSlice.actions;
export const cartAction = cartSlice.actions;
export default store;
