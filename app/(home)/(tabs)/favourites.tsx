import { Button, Pressable, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFavourites } from "@/services/favouriteServices";
import showToast from "@/services/ToastM";
import { FoodItemType } from "@/constants/types";
import useCart from "@/hooks/useCart";
import { ScrollView } from "react-native-gesture-handler";

const Fav = () => {
  const { addToCart } = useCart();
  const [fav, setFav] = useState<FoodItemType[]>();
  const handleAddToCart = (item) => useCart(item);

  useEffect(() => {
    getFavourites()
      .then(setFav)
      .catch((error) => {
        console.log(error)
      });
  }, []);

  return (
    <SafeAreaView className="flex-1 px-4">
      <ScrollView className="m-2">
        {
          fav.map(({item }) => <FavCard key={item.id} item={item} handleAddToCart={handleAddToCart}/>)
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const FavCard = ({item, handleAddToCart}: {item: FoodItemType, handleAddToCart: (item: FoodItemType) => void }) => {
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
      <View>
        <View>
          <Text className="text-base">{item.name}</Text>
          <Price price={item.price} />
        </View>
        <View>
        <TouchableOpacity
              className=" bg-orange-500 rounded-lg p-2"
              onPress={() => handleAddToCart(item)}
            >
              <Entypo color={"white"} name={"plus"} size={hp(2)} />
            </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  )
}
export default Fav;
