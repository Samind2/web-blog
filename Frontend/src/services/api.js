import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;
console.log("baseURL:", baseURL);
const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json", // ต้องสะกดให้ถูกต้อง
  },
});

instance.interceptors.request.use((config) => {
  const token = TokenService.getLocalAccessToken();
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
})

export default instance;
