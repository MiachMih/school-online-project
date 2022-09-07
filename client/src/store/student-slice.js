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
      return { ...state, studentInfo: result, loading: false };
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

export const fetchStudent = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(studentActions.startLoading());
      const studentInfo = await api.fetchStudent();
      dispatch(studentActions.saveStudentInfo(studentInfo.data.result));
      dispatch(studentActions.endLoading());
    } catch (error) {
      console.log(error.response.data.message);
      navigate("/login", { replace: true });
    }
  };
};

export const loginStudent = (loginData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await api.loginStudent(loginData);
      dispatch(studentActions.create(response.data));
      navigate("/student", { replace: true });
    } catch (error) {}
  };
};

export const signUpStudent = (signUpData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await api.signUpStudent(signUpData);
      dispatch(studentActions.create(response.data));
      navigate("/student", { replace: true });
    } catch (error) {}
  };
};

export const validate = (navigate) => {
  return async (dispatch) => {
    dispatch(studentActions.startLoading());
    try {
      const response = await api.validate();
      if (response.data.valid) {
        navigate("/student");
      }
    } catch (error) {}
    dispatch(studentActions.endLoading());
  };
};

export const studentActions = studentSlice.actions;

export default studentSlice;
