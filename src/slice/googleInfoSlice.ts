import { createSlice } from "@reduxjs/toolkit";
const googleInfoSlice = createSlice({
  name: "googleInfoSlice",
  initialState: {
    googleData: "",
  },
  reducers: {
    storedGoogleData: (state, { payload }) => {
      state.googleData = payload;
    },
  },
});
export const { storedGoogleData } = googleInfoSlice.actions;
export default googleInfoSlice.reducer;
