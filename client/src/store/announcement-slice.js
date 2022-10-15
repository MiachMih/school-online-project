import * as api from "../api/announcement";

export function addAnnouncement(data) {
  return async (dispatch) => {
    try {
      const response = await api.createAnnouncement(data);
      return response.data.result;
    } catch (error) {}
  };
}
