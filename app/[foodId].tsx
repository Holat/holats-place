import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { getById } from "@/services/foodService";
import { FoodItemType } from "@/constants/types";
import { AntDesign, Feather } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Price, RoundedShimmer } from "@/components";
import { getFoodImage } from "@/constants/data";
import { StatusBar } from "expo-status-bar";
import { useAuth, useTheme, useCart } from "@/hooks";
import Animated from "react-native-reanimated";

export default function FoodInfo() {
  const { foodId } = useLocalSearchParams();
  const { theme, rStyle, rTextStyle } = useTheme();
  const [optimisticLike, setOptimisticLike] = useState(false);
  const [foodItem, setFoodItem] = useState<FoodItemType>();
  const { getCartItemById, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const { favFoods, toggleFavorite } = useAuth();
  const imgUrl = foodItem?.imageUrl.split("/").pop() || "";

  const fetchFoodItem = useCallback(async () => {
    getById(foodId.toString())
      .then(setFoodItem)
      .catch((error) => {
        router.back();
      });
  }, [foodId]);

  useEffect(() => {
    fetchFoodItem();
  }, [fetchFoodItem]);

  useEffect(() => {
    const item = getCartItemById(foodId.toString());
    item && setQuantity(item.quantity);

    if (favFoods.includes(foodId as string)) {
      setOptimisticLike(true);
    }
  }, []);

  const handleLikePress = async () => {
    const currentLike = optimisticLike;
    setOptimisticLike(!currentLike);
    toggleFavorite(foodId as string);
  };

  return (
    <View className="flex-1 flex">
      <StatusBar style="light" />
      <View className="flex-1">
        <View className="w-full h-full">
          {foodItem ? (
            <Image
              source={getFoodImage(imgUrl)}
              className="w-full h-full"
              cachePolicy={"disk"}
            />
          ) : (
            <View className="w-full h-full">
              <RoundedShimmer />
            </View>
          )}
        </View>
        <View
          className="absolute flex-row justify-between w-full px-4"
          style={{ top: top + 10 }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign color={"white"} name={"left"} size={hp(4)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLikePress}>
            {optimisticLike ? (
              <AntDesign color={"#FA6400"} name={"heart"} size={hp(4)} />
            ) : (
              <AntDesign color={"white"} name={"hearto"} size={hp(4)} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1" />
      <Animated.View
        className="flex-1 p-4 flex justify-between absolute bottom-0 rounded-t-3xl w-full"
        style={[{ height: "55%" }, rStyle]}
      >
        <View className="flex-1 pt-2 mb-8 flex justify-between">
          <View className="flex items-start mb-5">
            {foodItem ? (
              <Animated.Text
                className=" font-semibold"
                style={[{ fontSize: hp(3.5) }, rTextStyle]}
              >
                {foodItem?.name}
              </Animated.Text>
            ) : (
              <RoundedShimmer h={20} w={200} />
            )}
            <View>
              {foodItem ? (
                <Price
                  price={foodItem?.price || 0}
                  fontSize={hp(2.5)}
                  color="#4A4A4A"
                />
              ) : (
                <View className="mt-3">
                  <RoundedShimmer h={20} w={80} />
                </View>
              )}
            </View>
          </View>
          <View className="flex-row items-center">
            {foodItem ? (
              foodItem?.tags.map((tag, index) => (
                <View
                  key={tag + index}
                  className="px-3 py-1 rounded-md mr-5"
                  style={{ backgroundColor: theme.accentV }}
                >
                  <Text
                    className="font-semibold text-neutral-800"
                    style={{ fontSize: hp(2), color: theme.text }}
                  >
                    {tag}
                  </Text>
                </View>
              ))
            ) : (
              <View className="flex-row items-center justify-between w-1/2">
                <RoundedShimmer w={45} h={35} />
                <RoundedShimmer w={45} h={35} />
                <RoundedShimmer w={45} h={35} />
              </View>
            )}
          </View>
          <View className="flex-1 justify-center  my-3">
            {foodItem ? (
              <Text className=" leading-6 text-neutral-600">
                {foodItem?.desc}
              </Text>
            ) : (
              <View className="flex h-full justify-evenly">
                <RoundedShimmer h={15} />
                <RoundedShimmer h={15} />
                <RoundedShimmer h={15} />
                <RoundedShimmer h={15} />
                <RoundedShimmer h={15} />
              </View>
            )}
          </View>
          <View className="flex-row items-center justify-between px-2">
            <ItemD name={"star"} item={foodItem?.stars} color={theme.text} />
            <ItemD
              name={"clockcircleo"}
              item={foodItem?.cookTime}
              color={theme.text}
            />
            <ItemD
              name={"enviroment"}
              item={foodItem?.origins[0]}
              color={theme.text}
            />
          </View>
        </View>

        <View className="flex-row w-full  items-center justify-evenly">
          <View
            className="rounded-lg w-full h-full flex-row p-4 justify-between items-center"
            style={{ width: wp(30), backgroundColor: theme.accentV }}
          >
            <TouchableOpacity
              className="bg-[#FA6400] px-1 rounded-md  w-6 h-6 justify-center"
              onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              <AntDesign color={"white"} name={"minus"} size={hp(2)} />
            </TouchableOpacity>
            <View>
              <Text
                className="text-neutral-800 font-semibold"
                style={{ fontSize: hp(2), color: theme.text }}
              >
                {quantity}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-[#FA6400] px-1 rounded-md  w-6 h-6 justify-center"
              onPress={() => setQuantity(quantity + 1)}
            >
              <AntDesign color={"white"} name={"plus"} size={hp(2)} />
            </TouchableOpacity>
          </View>
          <View
            className=" rounded-lg h-full p-4 flex-1 items-center ml-2"
            style={{ backgroundColor: theme.accentV }}
          >
            <TouchableOpacity
              // disable={foodItem}
              onPress={() => addToCart(foodItem, quantity)}
              className="flex-row items-center justify-centre gap-4 w-full"
            >
              <Feather name="shopping-bag" color={"#FA6400"} size={hp(3)} />
              <Text
                className=" font-semibold text-neutral-800"
                style={{ fontSize: hp(2.3), color: theme.text }}
              >
                Add To Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const ItemD = ({
  name,
  item,
  color,
}: {
  name: "star" | "enviroment" | "clockcircleo";
  item?: string | number;
  color: string;
}) => {
  return (
    <View className="flex-row items-center">
      <AntDesign name={name} size={hp(3)} color={"#FA6400"} />
      <View className="ml-2">
        {item ? (
          <Text
            className="font-bold"
            style={{ fontSize: hp(2.3), color: color }}
          >
            {item}
          </Text>
        ) : (
          <RoundedShimmer h={20} w={50} />
        )}
      </View>
    </View>
  );
};
