import axios from "axios";
import Toast from "react-native-toast-message";

const showToast = () => {
  Toast.show({
    type: "success",
    text1: "Network Error",
    text2: "Please check your internet connection and try again.",
  });
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error.toJSON());
    if (!error.response) showToast();
    return Promise.reject(error);
  }
);
