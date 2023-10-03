import { createSlice } from "@reduxjs/toolkit";
import { fetchBranch } from "../thunks";

const branchSlice = createSlice({
  name: "branch",
  initialState: {
    data: null,
    error: null,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBranch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBranch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default branchSlice.reducer;
