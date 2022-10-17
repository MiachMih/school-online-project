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

export const createAnnouncement = async (data) =>
  API.post("/announcement/add-announcement", data);

export const getAnnouncements = async (query) =>
  API.get(`/announcement/get-announcements/?${query}`);

export const getMaxPages = async (limit) =>
  API.get(`/announcement/get-max-pages/?${limit}`);
