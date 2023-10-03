import { createSlice } from "@reduxjs/toolkit";
import { fetchNewProducts } from "../thunks";

const newProductsSlice = createSlice({
  name: "newProducts",
  initialState: {
    data: null,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchNewProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      });
  },
});

export default newProductsSlice.reducer;
