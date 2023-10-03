import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchBranch = createAsyncThunk("branch/fetch", async () => {
  const response = await axios.get("http://localhost:81/api/branch");
  return response.data.branch;
});

export { fetchBranch };
