import axios from "axios";
import { OrderType } from "@/constants/types";
import { getValueFor } from "./storage/asyncStorage";

const USER = process.env.EXPO_PUBLIC_USER || "";
const GOOGLE_API_KEY = process.env.
const apiInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "X-Client-Type": "app",
  },
});

apiInstance.interceptors.request.use(
  async (req) => {
    const user = await getValueFor(USER);
    const token = user && JSON.parse(user).token;
    if (token) req.headers["access_token"] = token;
    return req;
  },
  (error) => Promise.reject(error)
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

export const getAddressLatLng = async (addressId: string, key: string) => {
  const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${addressId}&key=${key}`);
  let location;
  if ( data ){
    const { geometry.location: { lng, lat } } = data;
    location = { lng, lat };
  }
  return location;
  // https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJneQ1fBO5t4kRf8mTw4ieb4Q&key=AIzaSyAKKj0qdxXVnidSbvBEBZC5aQEcxciRJOs
}
