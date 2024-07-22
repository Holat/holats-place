import { ImageSource } from "expo-image";
export const getFoodImage = (name: string) => {
  const foodImg: { [key: string]: ImageSource } = {
    "food-1.jpg": require("../assets/foods/food-1.jpg"),
    "food-2.jpg": require("../assets/foods/food-2.jpg"),
    "food-3.jpg": require("../assets/foods/food-3.jpg"),
    "food-4.jpg": require("../assets/foods/food-4.jpg"),
    "food-5.jpg": require("../assets/foods/food-5.jpg"),
    "food-6.jpg": require("../assets/foods/food-6.jpg"),
    "food-7.jpg": require("../assets/foods/food-7.jpg"),
    "food-8.jpg": require("../assets/foods/food-8.jpg"),
    "food-9.jpg": require("../assets/foods/food-9.jpg"),
    "food-10.jpg": require("../assets/foods/food-10.jpg"),
    "food-11.jpg": require("../assets/foods/food-11.jpg"),
    "food-12.jpg": require("../assets/foods/food-12.jpg"),
  };

  if (foodImg.hasOwnProperty(name)) {
    return foodImg[`${name}`];
  }

  return null;
};
