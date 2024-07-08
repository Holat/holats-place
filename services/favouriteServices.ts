import axios from "axios";
import { save, getValueFor } from "@/services/storage/asyncStorage";

const USER = process.env.EXPO_PUBLIC_USER || "";
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

export const addFavourite = async (foodId: number | string) => {
  try {
    const { data } = await apiInstance.post(`/api/favourites/${foodId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFavorite = async (foodId: number | string) => {
  try {
    const response = await apiInstance.delete(`/api/favourites/${foodId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFavourites = async () => {
  try {
    const response = await apiInstance.get(`/api/favourites`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFavouritesId = async () => {
  try {
    const response = await apiInstance.get(`/api/favourites/id`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getFavoriteFoods = async () => {
  try {
    const jsonValue = await getValueFor("favoriteFoods");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Error getting favorite foods from async storage", e);
  }
};

export const setFavoriteFoods = async (favoriteFoods: string[]) => {
  try {
    const jsonValue = JSON.stringify(favoriteFoods);
    await save("favoriteFoods", jsonValue);
  } catch (e) {
    console.error("Error setting favorite foods in async storage", e);
  }
};
