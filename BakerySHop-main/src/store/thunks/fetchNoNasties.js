import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchNoNasties = createAsyncThunk("noNasties/fetch", async () => {
  const response = await axios.get("http://localhost:81/api/get-three-nasties");
  return response.data.noNasties;
});

export { fetchNoNasties };
