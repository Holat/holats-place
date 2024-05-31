import axios from "axios";
import { sample_foods, sample_tags } from "@/constants/data";

export const getAll = async () => {
  const { data } = await axios.get("http://192.168.233.71:5000/api/foods");
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get("http://192.168.233.71:5000/api/foods/tags");
  return data;
};

export const searchApi = async (searchTerm: string) => {
  const { data } = await axios.get(
    "http://192.168.233.71:5000/api/foods/search/" + searchTerm
  );
  return data;
};

export const getAllByTag = async (tag: string) => {
  if (tag === "All") return getAll();
  const { data } = await axios.get("/api/foods/tag/" + tag);
  return data;
};

export const getById = async (foodId: string | number | undefined) => {
  const { data } = await axios.get(
    "http://192.168.233.71:5000/api/foods/" + foodId
  );
  // return data;
  // const data = sample_foods.find((food) => food.id == foodId);
  return data;
};
