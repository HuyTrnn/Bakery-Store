import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const addCart = createAsyncThunk("cart/add", async (data) => {
  const response = await axios.post(
    `https://backpack-nu.vercel.app/api/auth/carts`, data
  );

  return response.data;
});

export { addCart };
