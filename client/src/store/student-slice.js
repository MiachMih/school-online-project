import { userActions } from "./user-slice";

import * as api from "../api/student";

export const updateRegisteringClasses = (data) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.startLoading());
      const studentInfo = await api.removeStudentFromClass(data);
      dispatch(userActions.saveUserInfo(studentInfo.data.result));
    } catch (error) {}
  };
};

export const updateStudent = (data) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.startLoading());
      const studentInfo = await api.updateStudent(data);
      dispatch(userActions.create(studentInfo.data));
    } catch (error) {}
  };
};

export function enrollStudentToClass(data) {
  return async (dispatch) => {
    try {
      const studentInfo = await api.addStudentToClass(data);
      dispatch(userActions.saveUserInfo(studentInfo.data.result));
    } catch (error) {}
  };
}

export const fetchStudent = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.startLoading());
      const studentInfo = await api.fetchStudent();
      dispatch(userActions.saveUserInfo(studentInfo.data.result));
      dispatch(userActions.setOld());
      dispatch(userActions.endLoading());
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
      dispatch(userActions.create(response.data));
      navigate("/student", { replace: true });
    } catch (error) {}
  };
};

export const signUpStudent = (signUpData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await api.signUpStudent(signUpData);
      dispatch(userActions.create(response.data));
      navigate("/student", { replace: true });
    } catch (error) {}
  };
};

export const validate = (navigate) => {
  return async (dispatch) => {
    dispatch(userActions.startLoading());
    try {
      const response = await api.validate();
      if (response.data.valid) {
        navigate("/student");
      }
    } catch (error) {}
    dispatch(userActions.endLoading());
  };
};
