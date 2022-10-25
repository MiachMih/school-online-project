import axios from "axios";

const API = axios.create({ baseURL: "https://school-online-ap.herokuapp.com" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getClientSecret = async (data) =>
  API.post("/payment/create-payment-intent", data);
