import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchNewProducts = createAsyncThunk("newProducts/fetch", async () => {
  const response = await axios.get("https://backpack-nu.vercel.app/api/products");
  return response.data.data;
});

export { fetchNewProducts };
