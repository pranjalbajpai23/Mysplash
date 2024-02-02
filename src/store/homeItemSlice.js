import { createSlice } from "@reduxjs/toolkit";

const homeItemSlice = createSlice({
  name: "homeItemSlice",
  initialState: [],
  reducers: {
    addHomeItem: (state, action) => {
      return action.payload;
    },
  },
});
export const homeItemActions = homeItemSlice.actions;
export default homeItemSlice;