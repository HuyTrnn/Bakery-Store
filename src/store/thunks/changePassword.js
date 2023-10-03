import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const changePassword = createAsyncThunk(
  "auth/change-password",
  async (data) => {
    const response = await axios.post(
      "http://localhost:81/api/auth/reset-password",
      data
    );

    return response.data;
  }
);

export { changePassword };
