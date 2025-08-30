import axios from "axios";
import { appConstants } from "../constants/appConstants";

// Configure base URL and timeout
const APIKit = axios.create({
  baseURL: appConstants?.baseUrl,
  timeout: 60000, // Adjusted to 60 seconds
});

// Add request interceptor
APIKit.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("access-token") ||
      sessionStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default APIKit;
