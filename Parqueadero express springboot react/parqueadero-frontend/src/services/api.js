import axios from "axios";

export const authAPI = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

export const vehicleAPI = axios.create({
  baseURL: "http://localhost:8080/api/vehicles",
});