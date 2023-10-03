import { createSlice } from "@reduxjs/toolkit";
import { fetchFags } from "../thunks";

const fagsSlice = createSlice({
  name: "fags",
  initialState: {
    data: null,
    error: null,
    status: "idle",
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default fagsSlice.reducer;
