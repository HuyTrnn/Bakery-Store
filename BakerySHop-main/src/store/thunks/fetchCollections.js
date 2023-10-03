import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchCollections = createAsyncThunk("collections/fetch", async () => {
  const response = await axios.get("http://localhost:81/api/products-type");
  return response.data.productByType;
});

export { fetchCollections };
