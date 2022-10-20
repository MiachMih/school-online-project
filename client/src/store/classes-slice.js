import * as api from "../api/classes";

export function fetchClassesNames() {
  return async (dispatch) => {
    const response = await api.getClassesNames();
    return response.data.result;
  };
}

export function newClass(data) {
  return async (dispatch) => {
    try {
      await api.newClass(data);
    } catch (error) {}
  };
}

export function fetchClassById(data) {
  return async (dispatch) => {
    try {
      const response = await api.getClassById(data);
      return response.data.result;
    } catch (error) {}
  };
}

export function updateClass(data) {
  return async (dispatch) => {
    try {
      await api.updateClass(data);
      const response = await api.getClassById({ id: data._id });
      return response.data.result;
    } catch (error) {}
  };
}

export function fetchClassesBySubject(params, query) {
  return async (dispatch) => {
    try {
      const response = await api.getClasses(params, query);
      return response.data.result;
    } catch (error) {}
  };
}

export function addSubject(data) {
  return async (dispatch) => {
    try {
      await api.addSubject(data);
    } catch (error) {}
  };
}

export function fetchSubjects() {
  return async (dispatch) => {
    try {
      const response = await api.getSubjects();
      return response.data.result;
    } catch (error) {}
  };
}

export function getIsYearInProgress() {
  return async (dispatch) => {
    try {
      const response = await api.getIsYearInProgress();
      return response.data.result;
    } catch (error) {}
  };
}

export function toggleYearInProgress() {
  return async (dispatch) => {
    try {
      const response = await api.toggleYearInProgress();
      return response.data.result;
    } catch (error) {}
  };
}
