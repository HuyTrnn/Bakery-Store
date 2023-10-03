import { createSlice } from "@reduxjs/toolkit";
import { fetchForte } from "../thunks";

const forteSlice = createSlice({
  name: "forte",
  initialState: {
    data: null,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchForte.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchForte.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchForte.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default forteSlice.reducer;
