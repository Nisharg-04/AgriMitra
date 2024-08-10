import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlices/LoginSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
