import axios from "axios";
import { getValueFor } from "./storage/asyncStorage";

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


export const addFavourite = async(foodId: number | string) => {
    try {
      const { data } = await apiInstance.post(`/api/favourites/${foodId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
};

export const removeFavorite = async(foodId: number | string) => {
    try {
      const response = await apiInstance.delete(`/api/favourites/${foodId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export const getFavourites = async() => {
    try {
        const response = await apiInstance.get(`/api/favourites`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};