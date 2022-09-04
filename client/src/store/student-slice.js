import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api/student";

const initialState = { isLoading: true };

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
});

export const loginStudent = (loginData) => {
  return async (dispatch) => {
    try {
    } catch (error) {}
  };
};

export const signUpStudent = (signUpData) => {
  return async (dispatch) => {
    try {
      const response = await api.studentSignUp(signUpData);
      console.log(response);
      dispatch();
    } catch (error) {}
  };
};

export default studentSlice;
