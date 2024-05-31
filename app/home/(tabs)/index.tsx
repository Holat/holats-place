import { View, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Link, useNavigation, useRouter } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { FoodType, IAction } from "@/constants/types";
import { getAll, getAllTags } from "@/services/foodService";
import { Image } from "expo-image";
import FoodList from "@/components/FoodList";
import Tags from "@/components/Tags";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import Card from "@/components/Card";
import useCart from "@/hooks/useCart";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import Price from "@/components/Price";
// import StarRating from "@/components/Star";
// import FA6 from "react-native-vector-icons/FontAwesome6";
// import { ScrollView } from "react-native-virtualized-view";
// import { TextInput } from "react-native-gesture-handler";
// widthPercentageToDP as wp,

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
// #F6FAFD
export default function Home() {
  const navigation = useNavigation();
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentTag, setCurrentTag] = useState("All");
  const { addToCart } = useCart();

  useEffect(() => {
    const loadedFoods = getAll();
    loadedFoods.then((foodItems) =>
      dispatch({ type: FOODS_LOADED, payload: foodItems })
    );

    const tags = getAllTags();
    tags.then((tag) => {
      dispatch({ type: TAGS_LOADED, payload: tag });
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
            <FontAwesome6Icon
              name="bars-staggered"
              color={"black"}
              size={hp(3)}
            />
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
                source={require("../../../assets/images/avatar.jpeg")}
                className="rounded-full w-full h-full"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View className="flex-row w-full  bg-neutral-200 p-1 rounded-md mt-3">
          <TextInput
            style={{ height: hp(5.5) }}
            placeholder="Search for food"
            className=" bg-neutral-200 flex-1 pl-2"
            // onKeyPress
          />
          <TouchableOpacity
            className=" bg-orange-500 rounded-md p-3 items-center justify-center"
            style={{ height: hp(5.5), width: hp(5.5) }}
          >
            <FA6 color={"white"} name={"sliders"} size={hp(2)} />
          </TouchableOpacity>
        </View> */}
        <View className="self-start mt-3 pl-4">
          <Text className="text-4xl font-light">Get Your Food</Text>
          <Text className="text-4xl font-semibold">Delivered!</Text>
        </View>
      </View>
      <View className="mt-2 px-4">
        {/* <Text className="font-semibold text-xl">Categories</Text> */}
        <Tags tags={state.tags} />
      </View>
      <View className="w-full items-center mt-6" style={{ height: hp(39) }}>
        {state.foods && <FoodList data={state.foods} />}
      </View>
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="font-semibold text-xl">Categories</Text>
          <Link
            href={{
              pathname: "/home/",
            }}
            className="text-orange-600 underline"
          >
            See All
          </Link>
        </View>
        <Card item={state.foods[3]} handleAddToCart={addToCart} />
      </View>
    </SafeAreaView>
  );
}
