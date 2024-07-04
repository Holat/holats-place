import axios from "axios";
import { OrderType } from "@/constants/types";
import axios, { AxiosError } from "axios";
import { getValueFor } from "./storage/asyncStorage";

const USER = process.env.EXPO_PUBLIC_USER;
const apiInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "X-Client-Type": "app",
  },
});

apiInstance.interceptors.request.use(
  (req) => {
    const user = getValueFor(USER);
    const token = user && JSON.parse(user).token;
    if(token) req.headers["access_token"] = token;
    return req;
  },
  (error) => Promise.reject(error);
);

export const createOrder = async (order: OrderType) => {
  try {
    const { data } = await apiInstance.post("/api/orders/create", order);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUserOrder = async () => {
  const { data } = await apiInstance.get("/api/orders/currentUserOrder");
  return data;
};

export const pay = async (paymentId: string | number) => {
  try {
    const { data } = await apiInstance.put("/api/orders/pay", { paymentId });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async (state: string) => {
  const { data } = await apiInstance.get(`/api/orders/${state ?? ""}`);
  return data;
};

export const getAllStatus = async () => {
  const { data } = await apiInstance.get(`/api/orders/allStatus`);
  return data;
};
