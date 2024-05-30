import axios from "axios";
import { sample_foods, sample_tags } from "@/constants/data";

export const getAll = async () => {
  const data = sample_foods.slice(0, 5);
  //   const { data } = await axios.get("/api/foods/");
  return data;
};

export const getAllTags = async () => {
  // const { data } = await axios.get("/api/foods/tags");
  const data = sample_tags;
  return data;
};

export const search = async (searchTerm: string) => {
  const { data } = await axios.get("/api/foods/search/" + searchTerm);
  return data;
};

export const getAllByTag = async (tag: string) => {
  if (tag === "All") return getAll();
  const { data } = await axios.get("/api/foods/tag/" + tag);
  return data;
};

export const getById = async (foodId: string | number | undefined) => {
  // const { data } = await axios.get("/api/foods/" + foodId);
  // return data;
  const data = sample_foods.find((food) => food.id == foodId);
  return data;
};
