import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const { payload } = action;

      const existingItem = state.items.find((item) => item.id === payload.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: payload.id,
          name: payload.title,
          price: payload.price,
          totalPrice: payload.price,
          quantity: 1,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += payload.price;
      }
    },

    removeItemFromCart(state, action) {
      const id = action.payload;

      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice--;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
