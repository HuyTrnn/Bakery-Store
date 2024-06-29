import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCollections = createAsyncThunk("collections/fetch", async () => {
  const response = await axios.get("https://backpack-nu.vercel.app/api/products");
  return response.data.productByType;
});

export { fetchCollections };
