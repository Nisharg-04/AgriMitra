import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Slices/UserSlices/LoginSlice";
import cropReducer from "../Slices/CropsSlice/GetAllCrops";
import newCropReducer from "../Slices/CropsSlice/createCrop";



const store = configureStore({
  reducer: {
    user: userReducer,
    crops:cropReducer,
    newCrop:newCropReducer,
  },
});

export default store;
