import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slice/authSlice";
import googleInfoSlice from "../slice/googleInfoSlice";

export const rootReducer = combineReducers({
  authSlice: authSlice,
  googleInfoSlice: googleInfoSlice,
});
