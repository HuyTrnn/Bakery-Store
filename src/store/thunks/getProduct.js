import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getProduct = createAsyncThunk("product/get", async (productId) => {
  const response = await axios.get(
    `https://backpack-nu.vercel.app/api/products/${productId}`
  );
  console.log('test', response.data.data);
  return response.data.data;
});

export { getProduct };
