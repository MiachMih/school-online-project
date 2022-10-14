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

export const getClasses = async (params, query) =>
  API.get(`/classes/get-classes/${params}?${query}`);
export const newClass = async (data) => API.post("/classes/new-class", data);
export const updateClass = async (data) =>
  API.put("/classes/update-class", data);
export const getClassesNames = async () =>
  API.get("/classes/get-classes-names");
export const getSubjects = async () => API.get("/subject/get-subjects");
export const addSubject = async (data) =>
  API.post("/subject/add-subject", data);
export const getClassById = async (params) =>
  API.get(`/classes/get-class-by-id/${params.id}`);
