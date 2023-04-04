import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      const { payload } = action;
      state.totalQuantity = payload.totalQuantity;
      state.items = payload.items;
    },

    addItemToCart(state, action) {
      const { payload } = action;

      state.totalQuantity++;
      state.changed = true;

      const existingItem = state.items.find((item) => item.id === payload.id);

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

      state.totalQuantity--;
      state.changed = true;

      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
