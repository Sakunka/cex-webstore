import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    displayItems: (state, action) => {
      state.total = action.payload.total;
      state.items = action.payload.items;
    },
    clearItems: (state) => {
      (state.total = 0), (state.items = []);
    },
  },
});

export const { displayItems, clearItems } = checkoutSlice.actions;

export default checkoutSlice.reducer;
