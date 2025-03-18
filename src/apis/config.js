import axios from "axios";
import { localService } from "./localService";
import { store } from "../redux/store";
import {
  handleLoadingOff,
  handleLoadingOn,
} from "../redux/reducer/spinnerSlice";

export const BASE_URL = "https://movienew.cybersoft.edu.vn/api/";

export const TOKEN_CYBER ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3NSIsIkhldEhhblN0cmluZyI6IjE0LzA1LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc0NzE4MDgwMDAwMCIsIm5iZiI6MTcyMDg5MDAwMCwiZXhwIjoxNzQ3MzI4NDAwfQ.bqygxoVHbmcy6bdDT5IDHZGoA3eMAp4YV6_E_dO_XxI";
 
 const 
export const configHeaders = () => {
  return { TokenCybersoft: TOKEN_CYBER };
};

// axios instance
export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBER,
    Authorization: "Bearer " + localService.get()?.accessToken,
  },
});
// interceptor  : can thiệp vào request và response từ api

https.interceptors.request.use(
  function (config) {
    store.dispatch(handleLoadingOn());
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
https.interceptors.response.use(
  function (response) {
    store.dispatch(handleLoadingOff());
    return response;
  },
  function (error) {
    store.dispatch(handleLoadingOff());
    return Promise.reject(error);
  }
);
