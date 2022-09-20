import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Admin ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const addNewClass = async () => API.post("/classes/new-class");
