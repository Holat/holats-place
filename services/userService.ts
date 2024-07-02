import axios, { AxiosError } from "axios";
import {
  RegisterValues,
  FormDetails,
  ChangePassFormType,
} from "@/constants/types";
import { save, deleteItem } from "./storage/asyncStorage";

const USER = "holatPlaceUser";

console.log();

const apiInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "X-Client-Type": "app",
  },
});

export const login = async (email: string, password: string) => {
  const { data } = await apiInstance.post(`/api/user/login`, {
    email: email.trim(),
    password,
  });
  const dataString = JSON.stringify(data);
  await save(USER, dataString);
  return data;
};

export const authenticate = async (email: string, token: string) => {
  if (!email || !token) {
    return false;
  } else {
    const { data } = await apiInstance.post(
      "/api/user/authenticate",
      {
        email: email.trim(),
      },
      {
        headers: {
          access_token: token,
        },
      }
    );
    if (data.success) {
      return true;
    } else {
      return false;
    }
  }
};

export const register = async (registerData: RegisterValues) => {
  const { data } = await apiInstance.post(`/api/user/register`, registerData);

  const dataString = JSON.stringify(data);
  await save(USER, dataString);
  return data;
};

export const updateProfile = async (user: FormDetails) => {
  try {
    const { data } = await apiInstance.put(`/api/user/updateProfile`, user);

    const dataString = JSON.stringify(data);
    await save(USER, dataString);

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
  await apiInstance.put(`/api/user/changePassword`, passwords);
};

export const logout = () => {
  deleteItem(USER);
};
