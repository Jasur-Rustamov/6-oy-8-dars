import axios from "axios";

const http = axios.create({
  baseURL: "https://auth-rg69.onrender.com/api",
});

export { http };