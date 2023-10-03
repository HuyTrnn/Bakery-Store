import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchNewProducts = createAsyncThunk("newProducts/fetch", async () => {
  const response = await axios.get("http://localhost:81/api/new-products");
  return response.data.newProducts;
});

export { fetchNewProducts };
