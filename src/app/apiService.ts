import axios from "axios";
import { BASE_URL } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (req) => {
    console.log("Request", req);
    return req;
  },
  function (err) {
    console.log("Request Error", err);
    return Promise.reject(err);
  }
);

apiService.interceptors.response.use(
  (res) => {
    console.log("Response", res);
    return res;
  },
  function (err) {
    console.log("Response Error", err);
    return Promise.reject(err);
  }
);

export default apiService;
