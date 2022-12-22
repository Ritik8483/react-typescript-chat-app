import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    authToken: "",
    googleCreds: "",
    userNameToken: "",
    signupUserImg: "",
    mobileUserImg: "",
    mobileUserToken: "",
    mobileUserNumber:""
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
    storeUserImage: (state, action) => {
      state.signupUserImg = action?.payload;
    },
    storeMobileUserImg: (state, { payload }) => {
      state.mobileUserImg = payload;
    },
    storeMobileUserToken: (state, { payload }) => {
      state.mobileUserToken = payload;
    },
    storeMobileUserNumber: (state, { payload }) => {
      state.mobileUserNumber = payload;
    },
  },
});
export const {
  saveAuthToken,
  storeGoogleCreds,
  storeUserToken,
  storeUserImage,
  storeMobileUserImg,
  storeMobileUserToken,
  storeMobileUserNumber
} = authSlice.actions;
export default authSlice.reducer;
