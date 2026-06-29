import { authAPI } from "./api";

export const login = async (data) => {
  return await authAPI.post("/login", data);
};

export const register = async (data) => {
  return await authAPI.post("/register", data);
};