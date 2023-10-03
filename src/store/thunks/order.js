import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const order = createAsyncThunk("order/post", async (data) => {
  const response = await axios.post(
    "http://localhost:81/api/order-items",
    data
  );

  return response.data;
});

export { order };
