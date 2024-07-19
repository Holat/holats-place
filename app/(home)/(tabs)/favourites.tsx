import { Pressable, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFavourites } from "@/services/favouriteServices";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FoodItemType, FavFoodCardType } from "@/constants/types";
import { useTheme, useCart } from "@/hooks";
import { ScrollView } from "react-native-gesture-handler";
import { getFoodImage } from "@/constants/data";
import { Image } from "expo-image";
import { Price } from "@/components";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

const Fav = () => {
  const { theme, rStyle, rTextStyle, value } = useTheme();
  const { addToCart, toggleFavorite, clearFavourite, favFoods } = useCart();
  const [fav, setFav] = useState<FoodItemType[]>();
  const handleAddToCart = (item: FoodItemType) => addToCart(item);
  const handleFav = (foodId: string | number) => toggleFavorite(foodId);

  useEffect(() => {
    getFavourites()
      .then(setFav)
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const isFav = (foodId: string | number) => {
    if (favFoods.includes(foodId)) return true;
    return false;
  };

  return (
    <Animated.View className="flex-1" style={rStyle}>
      <SafeAreaView className="flex-1 px-2">
        <View
          className="m-2 py-3 rounded-lg"
          style={{
            backgroundColor: theme.accentV,
            borderColor: theme.accent,
            borderWidth: 1,
          }}
        >
          <Animated.Text
            className="text-center font-bold text-base"
            style={rTextStyle}
          >
            Favourite Foods
          </Animated.Text>
        </View>
        <ScrollView className="mb-20 mx-2 mt-2">
          {fav?.map((item) => (
            <FavCard
              key={item.id}
              item={item}
              handleAddToCart={handleAddToCart}
              handleFav={handleFav}
              value={value}
              isFav={isFav(item.id)}
            />
          ))}
        </ScrollView>
        <Pressable
          className="absolute right-3 bottom-20 w-12 h-12 rounded-full mb-2 items-center justify-center"
          onPress={() => clearFavourite()}
          style={{ backgroundColor: theme.accent }}
        >
          <AntDesign name="delete" color={"white"} size={hp(3)} />
        </Pressable>
      </SafeAreaView>
    </Animated.View>
  );
};

const FavCard = ({
  item,
  handleAddToCart,
  value,
  handleFav,
  isFav,
}: FavFoodCardType) => {
  const [fav, setFav] = useState(isFav);
  const imgUrl = item.imageUrl.split("/").pop() || "";
  const color = value === "dark" ? "#fff" : "#000";
  const backgroundColor = value === "dark" ? "#1e1e1e" : "#fff";

  return (
    <Pressable
      className="rounded-xl mb-3 p-2 flex-row "
      style={{ backgroundColor }}
    >
      <View className="mr-3">
        <Image
          source={getFoodImage(imgUrl)}
          className="h-20 w-20 rounded-xl"
          contentFit="cover"
        />
      </View>
      <View className="flex-1 justify-between">
        <View className="flex-row items-start justify-between">
          <View>
            <Text className="text-base" style={{ color }}>
              {item.name}
            </Text>
            <Price price={item.price} color={color} />
          </View>
          <View className="p-1">
            <TouchableOpacity onPress={() => handleFav(item.id)}>
              {fav ? (
                <AntDesign color={"#FA6400"} name={"heart"} size={hp(2)} />
              ) : (
                <AntDesign color={"white"} name={"hearto"} size={hp(2)} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View className="items-end justify-end">
          <TouchableOpacity
            className=" bg-orange-500 rounded-lg p-1"
            onPress={() => handleAddToCart(item)}
          >
            <Entypo color={"white"} name={"plus"} size={hp(2)} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
};
export default Fav;
