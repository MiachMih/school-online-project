import { createSlice } from "@reduxjs/toolkit";
import * as api from "../api/teacher";
import * as utility from "./utility-functions";

const teacherSlice = createSlice({
  name: "teacher",
  initialState: utility.initialState,
  reducers: {
    startLoading: utility.startLoading,
    endLoading: utility.endLoading,
    create: utility.create,
    saveTeacherInfo: utility.saveUserInfo,
    logout: utility.logout,
    setOld: utility.setOld,
  },
});

export const updateTeacher = (data) => {
  return async (dispatch) => {
    try {
      dispatch(teacherActions.startLoading());
      const teacherInfo = await api.updateTeacher(data);
      dispatch(teacherActions.create(teacherInfo.data));
    } catch (error) {}
  };
};

export const fetchTeacher = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(teacherActions.startLoading());
      const teacherInfo = await api.fetchTeacher();
      dispatch(teacherActions.saveTeacherInfo(teacherInfo.data.result));
      dispatch(teacherActions.setOld());
      dispatch(teacherActions.endLoading());
    } catch (error) {
      console.log(error.response.data.message);
      navigate("/login", { replace: true });
    }
  };
};

export const loginTeacher = (loginData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await api.loginTeacher(loginData);
      dispatch(teacherActions.create(response.data));
      navigate("/teacher", { replace: true });
    } catch (error) {}
  };
};

export const signUpTeacher = (signUpData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await api.signUpTeacher(signUpData);
      dispatch(teacherActions.create(response.data));
      navigate("/teacher", { replace: true });
    } catch (error) {}
  };
};

export const teacherActions = teacherSlice.actions;

export default teacherSlice;
