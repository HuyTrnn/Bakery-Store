import { createSlice } from "@reduxjs/toolkit";
import { fetchCollections } from "../thunks";

const collectionsSlice = createSlice({
  name: "collections",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCollections.rejected, (state, actions) => {
        state.status = "failed";
        state.error = actions.payload;
      })
      .addCase(fetchCollections.fulfilled, (state, actions) => {
        state.status = "succeeded";
        state.data = actions.payload;
      });
  },
});

export default collectionsSlice.reducer;
