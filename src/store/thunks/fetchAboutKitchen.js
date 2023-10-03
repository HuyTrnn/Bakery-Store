import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAboutKitchen = createAsyncThunk("aboutKitchen/fetch", async () => {
  const response = await axios.get("http://localhost:81/api/kitchen");

  return response.data.ourKitchen;
});

export { fetchAboutKitchen };
