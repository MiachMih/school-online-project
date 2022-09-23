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

export const fetchTeacher = async () => API.get(`/teacher/profile`);

export const updateTeacher = async (updateData) =>
  API.put("/teacher/profile", updateData);

export const loginTeacher = async (loginData) =>
  API.post("/teacher/login", loginData);
export const signUpTeacher = async (signUpData) =>
  API.post("/teacher/signup", signUpData);
