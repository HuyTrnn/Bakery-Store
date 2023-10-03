import { createSlice } from "@reduxjs/toolkit";
import { fetchAboutKitchen } from "../thunks";

const aboutKitchenSlice = createSlice({
  name: "aboutKitchen",
  initialState: {
    data: null,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutKitchen.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAboutKitchen.fulfilled, (state, action) => {
        state.status = "succeed";
        state.data = action.payload;
      })
      .addCase(fetchAboutKitchen.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default aboutKitchenSlice.reducer;
