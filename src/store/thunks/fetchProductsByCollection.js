import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProductsByCollection = createAsyncThunk(
  "fetch/productsByCollection",
  async (productTypeId) => {
    const response = await axios.get(
      `http://localhost:81/api/get-all-products-in-category/${productTypeId}`
    );

    return response.data.productByType;
  }
);

export { fetchProductsByCollection };
