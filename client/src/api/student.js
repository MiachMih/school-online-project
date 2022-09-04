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

export const fetchStudent = async (id) => API.get(`/student/${id}`);
export const studentLogin = async (loginData) =>
  API.post("/student/login", loginData);
export const studentSignUp = async (signUpData) =>
  API.post("/student/signup", signUpData);
