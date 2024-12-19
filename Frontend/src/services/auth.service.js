import api from "./api";
import { Cookie } from "react-cookie";
const API_URL = import.meta.env.VITE_BASE_URL + "/auth";
console.log("VITE_BASE_URL:", import.meta.env.VITE_BASE_URL);
console.log("API_URL:", API_URL);

const register = async (username, password) => {
  return await api.post(API_URL + "/register", { username, password });
};

const login = async (username, password) => {
  return await api.post(API_URL + "/login", { username, password });
};

const AuthService = {
  register,
  login
};

export default AuthService;
