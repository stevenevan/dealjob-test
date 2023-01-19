import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com",
  responseType: "json",
  timeout: 10_000,
});
