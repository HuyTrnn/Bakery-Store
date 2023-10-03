import { createSlice } from "@reduxjs/toolkit";
import { fetchCart, fetchNoNasties } from "../thunks";

const noNasties = createSlice({
  name: "noNasties",
  initialState: {
    data: null,
    error: null,
    status: "idle",
  },

  extraReducers: (builder) => {
    builder.addCase(fetchNoNasties.pending, (state) => {
      state.status = "isLoading";
    });
    builder.addCase(fetchNoNasties.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });
  },
});

export default noNasties.reducer;
