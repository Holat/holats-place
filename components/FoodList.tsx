import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Price from "./Price";
import StarRating from "./Star";
import Carousel from "react-native-snap-carousel";
import { FoodItemType } from "@/constants/types";
import { getFoodImage } from "@/constants/data";
import useCart from "@/hooks/useCart";
import { Entypo } from "@expo/vector-icons";

export default function FoodList({ data }: { data: FoodItemType[] }) {
  const { addToCart } = useCart();

  return (
    <Carousel
      data={data}
      keyExtractor={(item) => item.id as string}
      renderItem={({ item }) => (
        <FoodCard item={item} key={item.id} addToCart={addToCart} />
      )}
      sliderWidth={wp(100)}
      slideStyle={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
      firstItem={2}
      itemWidth={wp(52)}
    />
  );
}

const FoodCard = ({
  item,
  addToCart,
}: {
  item: FoodItemType;
  addToCart: (food?: FoodItemType) => void;
}) => {
  const router = useRouter();
  const imgUrl = item.imageUrl.split("/").pop() || "";

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        router.push({
          pathname: "/[foodId]",
          params: { foodId: item.id },
        })
      }
      className="shadow-lg"
    >
      <View
        style={{ width: wp(50), height: hp(39) }}
        className=" rounded-[26px] bg-white p-4"
      >
        <Image
          source={getFoodImage(imgUrl)}
          className=" flex-1 rounded-[20px] w-full"
          cachePolicy={"disk"}
        />
        <View className=" mt-2">
          <Text className=" font-bold mb-1" style={{ fontSize: hp(2.3) }}>
            {item.name}
          </Text>
          <StarRating stars={item.stars} size={13} />
        </View>

        <View className=" mt-4 flex-row justify-between items-center">
          <Price price={item.price} fontSize={hp(2.3)} />
          <TouchableOpacity
            className=" bg-orange-500 rounded-lg p-2"
            onPress={() => addToCart(item)}
          >
            <Entypo color={"white"} name={"plus"} size={hp(2)} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
