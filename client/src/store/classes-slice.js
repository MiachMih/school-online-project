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
