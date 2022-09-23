import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api/student";
import * as utility from "./utility-functions";

const studentSlice = createSlice({
  name: "student",
  initialState: utility.initialState,
  reducers: {
    startLoading: utility.startLoading,
    endLoading: utility.endLoading,
    create: utility.create,
    saveStudentInfo: utility.saveUserInfo,
    logout: utility.logout,
    setOld: utility.setOld,
  },
});

export const updateStudent = (data) => {
  return async (dispatch) => {
    try {
      dispatch(studentActions.startLoading());
      const studentInfo = await api.updateStudent(data);
      dispatch(studentActions.create(studentInfo.data));
    } catch (error) {}
  };
};

export const fetchStudent = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(studentActions.startLoading());
      const studentInfo = await api.fetchStudent();
      dispatch(studentActions.saveStudentInfo(studentInfo.data.result));
      dispatch(studentActions.setOld());
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
