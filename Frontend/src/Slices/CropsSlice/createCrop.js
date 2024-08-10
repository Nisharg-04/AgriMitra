import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const newCropEntry = createAsyncThunk("newCropEntry", async (args) => {
  console.log(args);
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(`/api/v1/crop/createCrop`, args, config);
  try {
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
});

const cropSlice = createSlice({
  name: "newCrop",
  initialState: {
    newCrop: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(newCropEntry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(newCropEntry.fulfilled, (state, action) => {
      state.loading = false;
      state.newCrop = action.payload;
    });
    builder.addCase(newCropEntry.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default cropSlice.reducer;
