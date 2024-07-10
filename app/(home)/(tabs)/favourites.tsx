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
  const { theme } = useTheme();
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
      <SafeAreaView className="flex-1 px-4">
        <View
          className="m-2 p-2 rounded-lg"
          style={{ backgroundColor: theme.bkg2 }}
        >
          <Text className="text-center" style={{ color: theme.text }}>
            Favourite Foods
          </Text>
        </View>
        <ScrollView className="mb-24 mx-2 mt-2">
          {fav?.map((item) => (
            <FavCard
              key={item.id}
              item={item}
              handleAddToCart={handleAddToCart}
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
}: {
  item: FoodItemType;
  handleAddToCart: (item: FoodItemType) => void;
}) => {
  const imgUrl = item.imageUrl.split("/").pop() || "";

  return (
    <Pressable className="rounded-2xl mb-2 p-2 flex-row ">
      <View className="mr-3">
        <Image
          source={getFoodImage(imgUrl)}
          className="h-20 w-20 rounded-xl"
          contentFit="cover"
        />
      </View>
      <View className="flex-1">
        <View>
          <Text className="text-base">{item.name}</Text>
          <Price price={item.price} />
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
