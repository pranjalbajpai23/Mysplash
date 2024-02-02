import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "sessionStatus",
  initialState: false,
  reducers: {
    setSessionFalse: () => {
      return false;
    },
    setSessionTrue: () => {
      return true;
    },
  },
});

export const sessionAction=sessionSlice.actions;
export default sessionSlice;