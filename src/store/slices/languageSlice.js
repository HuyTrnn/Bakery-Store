import { createSlice } from "@reduxjs/toolkit";
import { order, logout } from "../thunks";
const language = createSlice({
  name: "language",
  initialState: {
    lang: "vi",
  },
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem(
        `language`,
        JSON.stringify(state.lang)
      );
    },
  },
});

export const { setLanguage } =
  language.actions;
export default language.reducer;
