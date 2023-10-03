import { createSlice } from "@reduxjs/toolkit";
import { fetchAboutBaker } from "../thunks";

const aboutBakerSlice = createSlice({
  name: "aboutBaker",
  initialState: {
    data: null,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutBaker.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAboutBaker.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAboutBaker.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default aboutBakerSlice.reducer;
