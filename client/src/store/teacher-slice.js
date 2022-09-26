import { userActions } from "./user-slice";
import * as api from "../api/teacher";

export const updateTeacher = (data) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.startLoading());
      const teacherInfo = await api.updateTeacher(data);
      dispatch(userActions.create(teacherInfo.data));
    } catch (error) {}
  };
};

export const fetchTeacher = (navigate) => {
  return async (dispatch) => {
    try {
      dispatch(userActions.startLoading());
      const teacherInfo = await api.fetchTeacher();
      dispatch(userActions.saveUserInfo(teacherInfo.data.result));
      dispatch(userActions.setOld());
      dispatch(userActions.endLoading());
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
      dispatch(userActions.create(response.data));
      navigate("/teacher", { replace: true });
    } catch (error) {}
  };
};

export const signUpTeacher = (signUpData, navigate) => {
  return async (dispatch) => {
    try {
      const response = await api.signUpTeacher(signUpData);
      dispatch(userActions.create(response.data));
      navigate("/teacher", { replace: true });
    } catch (error) {}
  };
};
