import { OrderType } from "@/constants/types";
import apiInstance from "./api";

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
