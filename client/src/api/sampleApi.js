import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/sample",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getSamples = () => API.get("/");
export const addSample = (data) => API.post("/", data);
export const updateSample = (id, data) => API.put(`/${id}`, data);
export const deleteSample = (id) => API.delete(`/${id}`);
