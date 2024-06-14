import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { getById } from "@/services/foodService";
import { CartItemType, FoodItemType } from "@/constants/types";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Price } from "@/components";
import { getFoodImage } from "@/constants/data";
import useCart from "@/hooks/useCart";
import { StatusBar } from "expo-status-bar";

export default function FoodInfo() {
  const { foodId } = useLocalSearchParams();
  const [foodItem, setFoodItem] = useState<FoodItemType>();
  const [cartItem, setCartItem] = useState<CartItemType>({} as CartItemType);
  const {
    changeQuantity,
    getCartItemById,
    addToCart,
    cart: { items },
  } = useCart();
  const [quantity, setQuantity] = useState(0);
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const imgUrl = foodItem?.imageUrl.split("/").pop() || "";

  const fetchFoodItem = useCallback(async () => {
    try {
      const item = await getById(foodId.toString());
      setFoodItem(item);
    } catch (error) {
      console.log("error getting food item", error);
    }
  }, [foodId]);

  useEffect(() => {
    fetchFoodItem();
  }, [fetchFoodItem]);

  useEffect(() => {
    const item = getCartItemById(foodId.toString());
    setCartItem(item);
    setQuantity(item?.quantity || 0);
  }, [items]);

  return (
    <View className="flex-1 flex">
      <StatusBar style="light" />
      <View className="flex-1">
        <Image
          source={getFoodImage(imgUrl)}
          className="w-full h-full"
          cachePolicy={"disk"}
        />
        <View
          className="absolute flex-row justify-between w-full px-4"
          style={{ top: top + 10 }}
        >
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons color={"white"} name={"chevron-back"} size={hp(4)} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons color={"white"} name={"heart-outline"} size={hp(4)} />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex-1 bg-white" />
      <View
        className="flex-1 p-4 flex justify-between absolute bottom-0 bg-white rounded-t-3xl w-full"
        style={{ height: "55%" }}
      >
        <View className="flex-1 pt-4 gap-4">
          <View className="flex justify-between">
            <Text className=" font-semibold mb-1" style={{ fontSize: hp(3.5) }}>
              {foodItem?.name}
            </Text>
            <View>
              <Price
                price={foodItem?.price || 0}
                fontSize={hp(2.5)}
                color="#4A4A4A"
              />
            </View>
          </View>
          <View>
            <View className="flex-row gap-4 items-center mb-3">
              {foodItem?.tags.map((tag, index) => (
                <View
                  key={tag + index}
                  className="bg-orange-100 px-3 py-1 rounded-md"
                >
                  <Text
                    className="font-semibold text-neutral-800"
                    style={{ fontSize: hp(2) }}
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
            <Text className=" leading-6 text-neutral-600">
              {foodItem?.desc}
            </Text>
          </View>
          <View className="flex-row items-center justify-between px-2">
            <View className="flex-row items-center gap-2">
              <AntDesign name="star" size={hp(3)} color={"#FA6400"} />
              <Text className="font-bold" style={{ fontSize: hp(2.3) }}>
                {foodItem?.stars}
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Ionicons name="alarm" size={hp(3)} color={"#FA6400"} />
              <Text className="font-bold" style={{ fontSize: hp(2.3) }}>
                {foodItem?.cookTime}min
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Entypo name="globe" size={hp(3)} color={"#FA6400"} />
              <Text className="font-bold" style={{ fontSize: hp(2.3) }}>
                {foodItem?.origins[0]}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row w-full  items-center justify-evenly">
          <View
            className=" bg-orange-100 rounded-lg w-full h-full flex-row p-4 justify-between items-center"
            style={{ width: wp(30) }}
          >
            <TouchableOpacity
              className="bg-[#FA6400] px-1 rounded-md  w-6 h-6 justify-center"
              onPress={() =>
                quantity > 0 && changeQuantity(cartItem, quantity - 1)
              }
            >
              <Entypo color={"white"} name={"minus"} size={hp(2)} />
            </TouchableOpacity>
            <View>
              <Text
                className="text-neutral-800 font-semibold"
                style={{ fontSize: hp(2) }}
              >
                {quantity}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-[#FA6400] px-1 rounded-md  w-6 h-6 justify-center"
              onPress={() => addToCart(foodItem)}
            >
              <Entypo color={"white"} name={"plus"} size={hp(2)} />
            </TouchableOpacity>
          </View>
          <View className="bg-orange-100 rounded-lg h-full p-4 flex-1 items-center ml-2">
            <TouchableOpacity
              onPress={() => addToCart(foodItem)}
              className="flex-row items-center justify-centre gap-4 w-full"
            >
              <Feather name="shopping-bag" color={"#FA6400"} size={hp(3)} />
              <Text
                className=" font-semibold text-neutral-800"
                style={{ fontSize: hp(2.3) }}
              >
                Add To Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
