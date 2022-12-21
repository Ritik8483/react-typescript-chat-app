import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    authToken: "",
    googleCreds: "",
    userNameToken: "",
    mobileToken: "",
  },
  reducers: {
    saveAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    storeGoogleCreds: (state, action) => {
      state.googleCreds = action?.payload;
    },
    storeUserToken: (state, action) => {
      state.userNameToken = action?.payload;
    },
  },
});
export const {
  saveAuthToken,
  storeGoogleCreds,
  storeUserToken,
} = authSlice.actions;
export default authSlice.reducer;
