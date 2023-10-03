import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getUser = createAsyncThunk("user/get", async (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const response = await axios.get("http://localhost:81/api/auth/user-profile");

  return response.data;
});

export { getUser };
