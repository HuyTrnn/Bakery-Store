import { createSlice } from "@reduxjs/toolkit";
import { fetchProductsByCollection } from "../thunks";

const productsByCollectionSlice = createSlice({
  name: "productsByCollection",
  initialState: {
    data: null,
    error: null,
    status: "idle",
    sort: "name-asc",
  },
  reducers: {
    sorted: (state, action) => {
      state.sort = action.payload;
      state.data.sort((a, b) => {
        const [field, order] = action.payload.split("-");
        const reverse = order === "asc" ? 1 : -1;
        const valueA = a[field];
        const valueB = b[field];
        if (field === "name") {
          return valueA.localeCompare(valueB) * reverse;
        }

        return (valueA - valueB) * reverse;
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCollection.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCollection.rejected, (state, actions) => {
        state.status = "failed";
        state.data = actions.payload;
      })
      .addCase(fetchProductsByCollection.fulfilled, (state, actions) => {
        state.status = "succeeded";
        state.data = actions.payload;
      });
  },
});

export const { sorted } = productsByCollectionSlice.actions;

export default productsByCollectionSlice.reducer;
