import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const fetchCart = createAsyncThunk("cart/fetch", async (userId) => {
  const response = await axios.get(`https://backpack-nu.vercel.app/api/auth/carts/${userId}`);
  console.log('response', response.data.data);
  return response.data.data;
});

export { fetchCart };
