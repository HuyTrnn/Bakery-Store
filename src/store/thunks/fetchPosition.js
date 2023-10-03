import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchPosition = createAsyncThunk("position/fetch", async () => {
  const response = await axios.get("http://localhost:81/api/position");

  return response.data.position;
});

export { fetchPosition };
