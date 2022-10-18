import * as api from "../api/payment";

export function getClientSecret(data) {
  return async (dispatch) => {
    try {
      const response = await api.getClientSecret(data);
      return response.data.clientSecret;
    } catch (error) {}
  };
}
