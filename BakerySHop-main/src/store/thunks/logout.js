import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const logout = createAsyncThunk("auth/logout", async (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const response = await axios.post("http://localhost:81/api/auth/logout");

  return response.data;
});

export { logout };
