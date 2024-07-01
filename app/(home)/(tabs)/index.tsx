import { View, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Link, useNavigation, useRouter } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { FoodType, IAction } from "@/constants/types";
import { getAllTags, getTopRated } from "@/services/foodService";
import { Image } from "expo-image";
import {
  Tags,
  FoodList,
  Card,
  HomeLoading,
  HomeCardLoading,
  TagsLoading,
} from "@/components";
import useCart from "@/hooks/useCart";
import Toast from "react-native-toast-message";

const FOODS_LOADED = "FOODS_LOADED";
const TAGS_LOADED = "TAGS_LOADED";
const initialState = {
  foods: [],
  tags: [],
};

const reducer = (state: FoodType, action: IAction) => {
  switch (action.type) {
    case FOODS_LOADED:
      return { ...state, foods: action.payload };
    case TAGS_LOADED:
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};
export default function Home() {
  const navigation = useNavigation();
  // const router = useRouter();
  const [{ foods, tags }, dispatch] = useReducer(reducer, initialState);
  // const [currentTag, setCurrentTag] = useState("All");
  const { addToCart } = useCart();

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Network Error",
      text2: "Please check your internet connection and try again.",
    });
  };

  useEffect(() => {
    const loadedFoods = getTopRated();
    loadedFoods
      .then((foodItems) => dispatch({ type: FOODS_LOADED, payload: foodItems }))
      .catch(() => {
        showToast();
      });

    const tags = getAllTags();
    tags
      .then((tag) => dispatch({ type: TAGS_LOADED, payload: tag }))
      .catch(() => {
        showToast();
      });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <StatusBar style="dark" />
      <View className=" flex-col items-center self-center pt-1">
        <View className="flex-row justify-between items-center w-full px-5">
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          >
            <FontAwesome6 name="bars-staggered" color={"black"} size={hp(3)} />
          </TouchableOpacity>
          <View className="flex-row justify-between items-center gap-3">
            <TouchableOpacity>
              <AntDesign color={"#FA6400"} name={"shoppingcart"} size={hp(4)} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ height: hp(5), width: hp(5) }}
              className=" items-center justify-center"
            >
              <Image
                source={require("@/assets/images/avatar.jpeg")}
                className="rounded-full w-full h-full"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="self-start mt-3 pl-4">
          <Text className="text-4xl font-light">Get Your Food</Text>
          <Text className="text-4xl font-semibold">Delivered!</Text>
        </View>
      </View>
      <View className="mt-2 px-4">
        {tags.length > 0 ? <Tags tags={tags} /> : <TagsLoading />}
      </View>
      <View className="w-full items-center mt-6" style={{ height: hp(39) }}>
        {foods.length > 0 ? <FoodList data={foods} /> : <HomeLoading />}
      </View>
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="font-semibold text-xl">Categories</Text>
          <Link
            href={{
              pathname: "/",
            }}
            className="text-orange-600 underline"
          >
            See All
          </Link>
        </View>
        {foods[3] ? (
          <Card item={foods[3]} handleAddToCart={addToCart} />
        ) : (
          <HomeCardLoading />
        )}
      </View>
    </SafeAreaView>
  );
}
