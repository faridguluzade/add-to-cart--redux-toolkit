import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notifaction: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },

    showNotifaction(state, action) {
      const { payload } = action;
      state.notifaction = { ...payload };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
