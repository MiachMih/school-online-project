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
export const validate = async () => API.get("/student/validate");
export const updateStudent = async (updateData) =>
  API.put("/student/profile", updateData);
export const addStudentToClass = async (data) =>
  API.put("/classes/add-student-to-class", data);
export const removeStudentFromClass = async (data) =>
  API.put("/classes/remove-student-from-class", data);
export const getClasses = async () => API.get("/classes/get-classes");
