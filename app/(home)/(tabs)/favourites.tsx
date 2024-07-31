import {
  Pressable,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { getFavourites } from "@/services/favouriteServices";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FoodItemType, FavFoodCardType } from "@/constants/types";
import { useTheme, useCart } from "@/hooks";
import { getFoodImage } from "@/constants/data";
import { Image } from "expo-image";
import { Price } from "@/components";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

const Fav = () => {
  const { theme, rStyle, cTheme } = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addToCart, toggleFavorite, clearFavourite } = useCart();
  const [fav, setFav] = useState<FoodItemType[]>([]);
  const handleAddToCart = (item: FoodItemType) => addToCart(item);
  const handleFav = (foodId: string | number) => toggleFavorite(foodId);

  const fetchFav = async () => {
    setIsLoading(true);
    getFavourites()
      .then(setFav)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchFav();
  }, []);

  return (
    <Animated.View className="flex-1" style={rStyle}>
      <FlatList
        className="mb-20 mx-2 mt-3"
        data={fav}
        onRefresh={fetchFav}
        refreshing={isLoading}
        renderItem={({ item }) => (
          <FavCard
            key={item.id}
            item={item}
            handleAddToCart={handleAddToCart}
            handleFav={handleFav}
            value={cTheme}
          />
        )}
        ListEmptyComponent={
          <View className="mb-4 flex-1 justify-center items-center">
            <Text className="font-semibold text-lg text-neutral-300">
              Empty
            </Text>
          </View>
        }
      />
      <Pressable
        className="absolute right-3 bottom-20 w-12 h-12 rounded-full mb-2 items-center justify-center"
        onPress={clearFavourite}
        style={{ backgroundColor: theme.accent }}
        disabled={fav.length > 0}
      >
        <AntDesign name="delete" color={"white"} size={hp(3)} />
      </Pressable>
    </Animated.View>
  );
};

const FavCard = ({
  item,
  handleAddToCart,
  value,
  handleFav,
}: FavFoodCardType) => {
  const imgUrl = item.imageUrl.split("/").pop() || "";
  const color = value === "dark" ? "#fff" : "#000";
  const backgroundColor = value === "dark" ? "#1e1e1e" : "#fff";

  return (
    <Pressable
      className="rounded-xl mb-3 p-2 flex-row "
      style={{ backgroundColor }}
      onPress={() => {
        router.navigate({
          pathname: "/details/[foodId]",
          params: { foodId: item?.id },
        });
      }}
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
              <AntDesign color={"#FA6400"} name={"heart"} size={hp(2)} />
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
