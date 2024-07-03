import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getProduct = createAsyncThunk(
  "product/get",
  async (productId, { getState }) => {
    // Access the lang state from Redux
    const { lang } = getState();
    
    // Configure the request headers
    const config = {
      headers: {
        "Accept-Language": lang || 'vi', // Set the Accept-Language header
      },
    };

    // Make the request with the configured headers
    const response = await axios.get(
      `https://backpack-nu.vercel.app/api/products/${productId}`,
      config
    );

    return response.data.data;
  }
);

export { getProduct };
