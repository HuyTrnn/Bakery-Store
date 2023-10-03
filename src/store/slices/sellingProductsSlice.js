import { createSlice } from "@reduxjs/toolkit";
import { fetchSellingProducts } from "../thunks";

const sellingProductsSlice = createSlice({
  name: "sellingProducts",
  initialState: {
    data: null,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellingProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSellingProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSellingProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default sellingProductsSlice.reducer;
