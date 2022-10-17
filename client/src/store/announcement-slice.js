import * as api from "../api/announcement";

export function addAnnouncement(data) {
  return async (dispatch) => {
    try {
      const response = await api.createAnnouncement(data);
      return response.data.result;
    } catch (error) {}
  };
}

export function getAnnouncements(query) {
  return async (dispatch) => {
    try {
      const response = await api.getAnnouncements(query);
      return response.data.result;
    } catch (error) {}
  };
}

export function getMaxPages(limit) {
  return async (dispatch) => {
    try {
      const response = await api.getMaxPages(`limit=${limit}`);
      return response.data.result;
    } catch (error) {
      console.log(error);
    }
  };
}
