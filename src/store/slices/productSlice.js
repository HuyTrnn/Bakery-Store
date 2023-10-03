import { createSlice } from "@reduxjs/toolkit";
import { getProduct } from "../thunks";

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: null,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProduct.rejected, (state, actions) => {
        state.status = "failed";
        state.error = actions.payload;
      })
      .addCase(getProduct.fulfilled, (state, actions) => {
        state.status = "succeeded";
        state.data = actions.payload;
      });
  },
});

export default productSlice.reducer;
