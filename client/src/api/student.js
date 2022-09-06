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

export const fetchStudent = async () => API.get(`/student/profile`);
export const loginStudent = async (loginData) =>
  API.post("/student/login", loginData);
export const signUpStudent = async (signUpData) =>
  API.post("/student/signup", signUpData);
