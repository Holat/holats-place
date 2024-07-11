import { Pressable, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFavourites } from "@/services/favouriteServices";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FoodItemType } from "@/constants/types";
import { useTheme, useCart } from "@/hooks";
import { ScrollView } from "react-native-gesture-handler";
import { getFoodImage } from "@/constants/data";
import { Image } from "expo-image";
import { Price } from "@/components";
import { Entypo } from "@expo/vector-icons";

const Fav = () => {
  const { addToCart } = useCart();
  const { theme, value } = useTheme();
  const [fav, setFav] = useState<FoodItemType[]>();
  const handleAddToCart = (item: FoodItemType) => addToCart(item);

  useEffect(() => {
    getFavourites()
      .then(setFav)
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <SafeAreaView className="flex-1 px-2">
        <View
          className="m-2 py-3 rounded-lg"
          style={{
            backgroundColor: theme.accentV,
            borderColor: theme.accent,
            borderWidth: 1,
          }}
        >
          <Text
            className="text-center font-bold text-base"
            style={{ color: theme.text }}
          >
            Favourite Foods
          </Text>
        </View>
        <ScrollView className="mb-20 mx-2 mt-2">
          {fav?.map((item) => (
            <FavCard
              key={item.id}
              item={item}
              handleAddToCart={handleAddToCart}
              value={value}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const FavCard = ({
  item,
  handleAddToCart,
  value,
}: {
  item: FoodItemType;
  handleAddToCart: (item: FoodItemType) => void;
  value: string;
}) => {
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
      <View className="flex-1">
        <View>
          <Text className="text-base" style={{ color }}>
            {item.name}
          </Text>
          <Price price={item.price} color={color} />
        </View>
        <View className="items-end">
          <TouchableOpacity
            className=" bg-orange-500 rounded-lg p-2"
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
