import axios from "axios";
import showToast from "@/services/ToastM";

axios.interceptors.response.use(
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
