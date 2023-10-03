import { createSlice } from "@reduxjs/toolkit";
import { fetchPosition } from "../thunks";

const positionSlice = createSlice({
  name: "position",
  initialState: {
    data: null,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosition.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosition.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPosition.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default positionSlice.reducer;
