import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const resetPassword = createAsyncThunk("resetPassword/post", async (email) => {
  const response = await axios.post(
    "http://localhost:81/api/auth/send-password-reset-link",
    null,
    {
      params: {
        email,
      },
    }
  );

  return response.data;
});

export { resetPassword };
