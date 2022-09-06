import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api/student";

const initialState = { loading: true, studentInfo: {} };

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    startLoading(state) {
      return { ...state, loading: true };
    },
    endLoading(state) {
      return { ...state, loading: false };
    },
    create(state, action) {
      const { result, token } = action.payload;
      localStorage.setItem("profile", JSON.stringify({ token }));
      console.log(result);
      return { ...state, studentInfo: result };
    },
    saveStudentInfo(state, action) {
      const studentInfo = action.payload;
      return { ...state, studentInfo };
    },
    logout(state) {
      localStorage.clear();
      return { ...state, ...initialState };
    },
  },
});

export const fetchStudent = () => {
  return async (dispatch) => {
    try {
      dispatch(studentActions.startLoading());
      const studentInfo = await api.fetchStudent();
      console.log(studentInfo.data);
      dispatch(studentActions.saveStudentInfo(studentInfo.data.result));
      dispatch(studentActions.endLoading());
    } catch (error) {}
  };
};

export const loginStudent = (loginData) => {
  return async (dispatch) => {
    try {
      const response = await api.loginStudent(loginData);
      dispatch(studentActions.create(response.data));
    } catch (error) {}
  };
};

export const signUpStudent = (signUpData) => {
  return async (dispatch) => {
    try {
      const response = await api.signUpStudent(signUpData);
      dispatch(studentActions.create(response.data));
    } catch (error) {}
  };
};

export const studentActions = studentSlice.actions;

export default studentSlice;
