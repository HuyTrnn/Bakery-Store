import { createSlice } from "@reduxjs/toolkit";
import { fetchSlideBanner } from "../thunks";

const slideBannerSlice = createSlice({
  name: "slideBanner",
  initialState: {
    data: null,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSlideBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSlideBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchSlideBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default slideBannerSlice.reducer;
