import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlices/LoginSlice";
import cropReducer from "../Slices/CropsSlice/GetAllCrops";


const store = configureStore({
  reducer: {
    user: userReducer,
    crops:cropReducer,
  },
});

export default store;
