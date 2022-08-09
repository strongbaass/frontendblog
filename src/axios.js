import axios from "axios";

const url = axios.create({
  baseURL: "http://localhost:4444/",
});

url.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default url;
