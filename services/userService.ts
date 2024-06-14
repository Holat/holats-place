import axios, { AxiosError } from "axios";
import {
  RegisterValues,
  FormDetails,
  ChangePassFormType,
} from "@/constants/types";

const USER = "holatPlaceUser";

const NewUserType = {
  name: "Holat",
  email: "holatolorunshola@gmail.com",
  password: "3784",
  address: "47 ogunfehintimi",
  phone: "08035748555",
  id: "12345",
  token: "wifuf3dj93ejdmd93md93mdm9",
};

export const getUser = () => {
  //   const userString = localStorage.getItem(USER);
  //   return userString ? JSON.parse(userString) : null;
  return NewUserType;
};

export const login = async (email: string, password: string) => {
  const { data } = await axios.post("/api/user/login", { email, password });
  //   localStorage.setItem(USER, JSON.stringify(data));
  return data;
};

export const authenticate = async(email: string, password: string) => {
  const { data } = await axios.post("/api/user/login", { email, password, token });
  if(data.success){
    return true;
  } else {
    return false;
  }
}

export const register = async (registerData: RegisterValues) => {
  const { data } = await axios.post("/api/user/register", registerData);
  //   localStorage.setItem(USER, JSON.stringify(data));
  return data;
};

export const updateProfile = async (user: FormDetails) => {
  try {
    const { data } = await axios.put("/api/user/updateProfile", user);
    // localStorage.setItem(USER, JSON.stringify(data));
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 409) {
        throw new Error("Email or Phone number already exists");
      } else {
        throw new Error("Failed to update profile. Please try again later.");
      }
    } else {
      throw new Error(
        "Failed to update profile. Please check your internet connection."
      );
    }
  }
};

export const changePassword = async (passwords: ChangePassFormType) => {
  await axios.put("/api/user/changePassword", passwords);
};

export const logout = () => {
  localStorage.removeItem(USER);
};
