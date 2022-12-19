import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    authToken: "",
    googleCreds: "",
  },
  reducers: {
    saveAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    storeGoogleCreds: (state, action) => {
      state.googleCreds = action?.payload;
    },
  },
});
export const { saveAuthToken, storeGoogleCreds } = authSlice.actions;
export default authSlice.reducer;
