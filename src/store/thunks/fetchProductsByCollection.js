import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchProductsByCollection = createAsyncThunk(
  "fetch/productsByCollection",
  async (productTypeId) => {
    const response = await axios.get(
      `https://backpack-nu.vercel.app/api/type/${productTypeId}`
    );
    return response.data;
  }
);

export { fetchProductsByCollection };
