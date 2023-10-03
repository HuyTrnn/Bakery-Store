import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchForte = createAsyncThunk("forte/fetch", async () => {
  const response = await axios.get("http://localhost:81/api/get-three-forte");

  return response.data.forte;
});

export { fetchForte };
