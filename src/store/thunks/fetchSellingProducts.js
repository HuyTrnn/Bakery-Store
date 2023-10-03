import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchSellingProducts = createAsyncThunk(
  "sellingProducts/fetch",
  async () => {
    const response = await axios.get(
      "http://localhost:81/api/selling-products"
    );
    return response.data.sellingProducts;
  }
);

export { fetchSellingProducts };
