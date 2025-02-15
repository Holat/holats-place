import { View, TouchableOpacity, RefreshControl } from "react-native";
import { useEffect, useReducer, useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { router, useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import { FoodType, IAction } from "@/constants/types";
import { getAllTags, getTopRated } from "@/services/foodService";
import { Image } from "expo-image";
import Animated from "react-native-reanimated";
import {
  Tags,
  FoodList,
  Card,
  HomeLoading,
  HomeCardLoading,
  TagsLoading,
} from "@/components";
import { useCart, useTheme } from "@/hooks";
import { ScrollView } from "react-native-gesture-handler";

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
  const [{ foods, tags }, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addToCart } = useCart();
  const { theme, rStyle, rBkg2Style, rTextStyle } = useTheme();

  const getFoods = useCallback(async () => {
    setIsLoading(true);
    const loadedFoods = getTopRated();
    loadedFoods
      .then((foodItems) => dispatch({ type: FOODS_LOADED, payload: foodItems }))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    getFoods();
    const tags = getAllTags();
    tags
      .then((tag) => dispatch({ type: TAGS_LOADED, payload: tag }))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Animated.View style={rStyle} className="flex-1">
      <SafeAreaView className="flex-1">
        <View className=" flex-col items-center self-center pt-1">
          <View className="flex-row justify-between items-center w-full px-5">
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <FontAwesome6
                name="bars-staggered"
                color={theme.text}
                size={hp(3)}
              />
            </TouchableOpacity>
            <View className="flex-row justify-between items-center gap-3">
              <TouchableOpacity
                style={{ height: hp(5), width: hp(5) }}
                className=" items-center justify-center"
                onPress={() => router.navigate("profile")}
              >
                <Image
                  source={require("@/assets/images/avatar.jpeg")}
                  className="rounded-full w-full h-full"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="self-start mt-3 pl-4">
            <Animated.Text className="text-4xl font-light" style={rTextStyle}>
              Get Your Food
            </Animated.Text>
            <Animated.Text
              className="text-4xl font-semibold"
              style={rTextStyle}
            >
              Delivered!
            </Animated.Text>
          </View>
        </View>
        <View className="mt-2 px-4">
          {tags.length > 0 ? (
            <Tags tags={tags} theme={theme} />
          ) : (
            <TagsLoading />
          )}
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={getFoods} />
          }
        >
          <View className="w-full items-center mt-6" style={{ height: hp(39) }}>
            {!isLoading ? (
              <FoodList data={foods} />
            ) : (
              <HomeLoading bkg={theme.bkg2} />
            )}
          </View>
          <View className="p-4">
            <View className="flex-row justify-between items-center mb-3">
              <Animated.Text
                className="font-semibold text-xl"
                style={rTextStyle}
              >
                Top Rated
              </Animated.Text>
            </View>
            {!isLoading ? (
              <Card
                item={foods[0]}
                handleAddToCart={() => addToCart(foods[0])}
                rBkg2Style={rBkg2Style}
                rTextStyle={rTextStyle}
                color={[theme.text, theme.bkg2]}
              />
            ) : (
              <HomeCardLoading backgroundColor={theme.bkg2} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}

/** 
 * <Link
  href={{
    pathname: "/categories/[tag]",
  }}
  className="text-orange-600 underline"
>
  See All
</Link>;
*/
