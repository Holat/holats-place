import axios from "axios";

const api = "https://378c-102-89-23-133.ngrok-free.app";

export const getAll = async () => {
  const { data } = await axios.get(`${api}/api/foods`);
  return data;
};

export const getTopRated = async () => {
  const { data } = await axios.get(`${api}/api/foods/topRatedFoods`);

  console.log(data);
  return data;
};

export const getAllTags = async () => {
  const { data } = await axios.get(`${api}/api/foods/tags`);
  return data;
};

export const searchApi = async (searchTerm: string) => {
  const { data } = await axios.get(`${api}/api/foods/search/` + searchTerm);
  return data;
};

export const getAllByTag = async (tag: string) => {
  if (tag === "All") return getAll();
  const { data } = await axios.get(`${api}/api/foods/tag/` + tag);
  return data;
};

export const getById = async (foodId: string | number | undefined) => {
  const { data } = await axios.get(`${api}/api/foods/` + foodId);
  return data;
};
