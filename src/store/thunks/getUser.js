import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getUser = createAsyncThunk("user/get", async (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  const response = await axios.get("https://backpack-nu.vercel.app/api/auth/me");

  return response.data;
});

export { getUser };
