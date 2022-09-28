import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getClasses = async () => API.get("/classes/get-classes");
export const newClass = async (data) => API.post("/classes/new-class", data);
export const getClassesNames = async () =>
  API.get("/classes/get-classes-names");
