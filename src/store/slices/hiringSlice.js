import { createSlice } from "@reduxjs/toolkit";
import { fetchHiring } from "../thunks";

const hiringSlice = createSlice({
  name: "hiring",
  initialState: {
    data: null,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHiring.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHiring.fulfilled, (state, action) => {
        state.status = "succeed";
        state.data = action.payload;
      })
      .addCase(fetchHiring.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default hiringSlice.reducer;
