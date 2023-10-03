import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const response = await axios.get("http://localhost:81/api/add-to-cart");
  return response.data;
});

export { fetchCart };
