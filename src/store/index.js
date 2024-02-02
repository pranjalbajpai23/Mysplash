import { configureStore } from "@reduxjs/toolkit";
import homeItemSlice from "./homeItemSlice";
import sessionSlice from "./sessionStatus";
import favoriteSlice from "./favoriteSlice";
const siteStore = configureStore({
  reducer: {
    homeItem: homeItemSlice.reducer,
    sessionStatus:sessionSlice.reducer,
    favorite:favoriteSlice.reducer,
  },
});
export default siteStore;