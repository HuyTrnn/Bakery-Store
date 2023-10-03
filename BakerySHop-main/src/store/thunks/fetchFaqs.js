import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchFags = createAsyncThunk("fags/fetch", async () => {
  const response = await axios.get("http://localhost:81/api/faq");
  return response.data.faq;
});

export { fetchFags };
