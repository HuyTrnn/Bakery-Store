import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const register = createAsyncThunk("register", async (data, thunkAPI) => {
  try {
    // Call the API function for registering a user
    const response = await axios.post(
      "http://localhost:81/api/auth/register",
      data
    );

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export { register };
