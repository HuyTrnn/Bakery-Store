import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addCart = createAsyncThunk("cart/add", async (productId) => {
  const response = await axios.get(
    `http://localhost:81/api/add-to-cart/${productId}`
  );

  return response.data;
});

export { addCart };
