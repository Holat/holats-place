import axios from "axios";
import showToast from "@/utils/ToastM";
import { getValueFor } from "@/utils/storage/asyncStorage";

const USER = process.env.EXPO_PUBLIC_USER || "";
const apiInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "X-Client-Type": "app",
  },
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response)
      showToast(
        "Network Error",
        "Please check your internet connection and try again."
      );
    return Promise.reject(error);
  }
);

apiInstance.interceptors.request.use(
  async (req) => {
    const user = await getValueFor(USER);
    const token = user && JSON.parse(user).token;
    if (token) req.headers["access_token"] = token;
    return req;
  },
  (error) => Promise.reject(error)
);

export default apiInstance;
