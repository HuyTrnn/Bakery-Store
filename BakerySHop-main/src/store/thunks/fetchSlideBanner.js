import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchSlideBanner = createAsyncThunk("slideBanner/fetch", async () => {
  const response = await axios.get("http://localhost:81/api/slide");

  return response.data.slide;
});

export { fetchSlideBanner };
