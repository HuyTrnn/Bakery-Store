import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchHiring = createAsyncThunk("hiring/fetch", async () => {
  const response = await axios.get("http://localhost:81/api/hiring");

  return response.data.hirring;
});

export { fetchHiring };
