import { createSlice } from "@reduxjs/toolkit";
import * as utility from "./utility-functions";

const userSlice = createSlice({
  name: "user",
  initialState: utility.initialState,
  reducers: {
    startLoading: utility.startLoading,
    endLoading: utility.endLoading,
    create: utility.create,
    saveUserInfo: utility.saveUserInfo,
    logout: utility.logout,
    setOld: utility.setOld,
  },
});

export const userActions = userSlice.actions;

export default userSlice;
