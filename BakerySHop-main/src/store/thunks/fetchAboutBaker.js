import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchAboutBaker = createAsyncThunk("aboutBaker/fetch", async () => {
  const response = await axios.get("http://localhost:81/api/about-baker");

  return response.data.aboutBaker;
});

export { fetchAboutBaker };
