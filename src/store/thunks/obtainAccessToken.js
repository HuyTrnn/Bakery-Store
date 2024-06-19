import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const obtainAccessToken = createAsyncThunk(
  "auth/getAccessToken",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://backpack-nu.vercel.app/api/auth/login",
        data
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export { obtainAccessToken };
