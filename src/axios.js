import axios from "axios";

const url = axios.create({
  baseURL: "https://blogreact13.herokuapp.com/",
});

url.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default url;
