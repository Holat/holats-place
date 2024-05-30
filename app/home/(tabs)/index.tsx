import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useReducer, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FA6 from "react-native-vector-icons/FontAwesome6";
import {
  // widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation, useRouter } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { FoodType, IAction } from "@/constants/types";
import { getAll, getAllTags } from "@/services/foodService";
import { Image } from "expo-image";
import FoodList from "@/components/FoodList";
// import AntDesign from "react-native-vector-icons/AntDesign";
// import Price from "@/components/Price";
// import StarRating from "@/components/Star";
// import { ScrollView } from "react-native-virtualized-view";
// import { TextInput } from "react-native-gesture-handler";

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
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentTag, setCurrentTag] = useState("All");

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
            <FA6 name="bars-staggered" color={"black"} size={hp(3)}></FA6>
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
        <ScrollView
          className="flex gap-x-3"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {state.tags &&
            state.tags.map((item, index) => (
              <Pressable
                key={index}
                className="bg-neutral-200 rounded-3xl px-4 py-1"
                style={{
                  backgroundColor:
                    item.name === currentTag ? "#fed7aa" : "white",
                  borderColor:
                    item.name === currentTag ? "#FA6400" : "transparent",
                  marginVertical: 4,
                  borderWidth: 1,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  // Shadow properties for Android
                  elevation: 3,
                }}
                onPress={() => setCurrentTag(item.name)}
              >
                <Text className="text-base">{item.name}</Text>
              </Pressable>
            ))}
        </ScrollView>
      </View>
      <View className="w-full items-center mt-6" style={{ height: hp(39) }}>
        {state.foods && <FoodList data={state.foods} />}
      </View>
    </SafeAreaView>
  );
}
