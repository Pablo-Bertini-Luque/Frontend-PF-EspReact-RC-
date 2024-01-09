import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const urlApi = "https://padel-per-tutti.onrender.com/api";

export const padelApiUrl = axios.create({
  baseURL: urlApi,
  timeout: 120000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

padelApiUrl.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("x-token");

  if (token) {
    config.headers["x-token"] = token;
  }

  return config;
});
//;
