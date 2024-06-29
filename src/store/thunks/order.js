import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const order = createAsyncThunk("order/post", async (data) => {
  const response = await axios.post(
    "https://backpack-nu.vercel.app/api/auth/orders",
    data
  );

  return response.data;
});

export { order };
