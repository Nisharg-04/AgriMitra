import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCrops = createAsyncThunk(
  "getAllCrops",
  async (args) => {
    const { data } = await axios.get(`/api/v1/crop/getCrops`);
    try {
      console.log(data);
      return data;
    } catch (error) {
      return error;
    }
  }
);

const getAllCropsSlice = createSlice({
  name: "allCrops",
  initialState: {
    loading: false,
    error: null,
    crops: [],
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCrops.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllCrops.fulfilled, (state, action) => {
      state.loading = false;
      state.crops = action.payload.message;
    });
    builder.addCase(getAllCrops.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  },
});

export default getAllCropsSlice.reducer;
