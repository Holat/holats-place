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
import { FoodItemType, ThemeType } from "@/constants/types";
import { getFoodImage } from "@/constants/data";
import { Entypo } from "@expo/vector-icons";
import { useAuth, useCart, useTheme } from "@/hooks";

export default function FoodList({ data }: { data: FoodItemType[] }) {
  const { addToCart } = useCart();
  const { theme } = useTheme();

  return (
    <Carousel
      data={data}
      keyExtractor={(item) => item?.id as string}
      renderItem={({ item, index }) => (
        <FoodCard
          item={item}
          key={item?.id}
          addToCart={addToCart}
          theme={theme}
        />
      )}
      sliderWidth={wp(100)}
      slideStyle={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
      firstItem={3}
      itemWidth={wp(52)}
      // loop
    />
  );
}

const FoodCard = ({
  item,
  addToCart,
  theme,
}: {
  item: FoodItemType;
  addToCart: (food?: FoodItemType) => void;
  theme: ThemeType;
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
        style={{
          width: wp(50),
          height: hp(39),
          backgroundColor: theme.bkg2,
        }}
        className=" rounded-[20px]  p-4"
      >
        <View className="w-full rounded-[10px]">
          <Image
            source={getFoodImage(imgUrl)}
            className="w-full h-40 rounded-[10px]"
            cachePolicy={"disk"}
          />
        </View>
        <View className="flex flex-1 justify-between">
          <View className=" mt-2">
            <Text
              className=" font-bold"
              style={{ fontSize: hp(2.3), color: theme.text }}
            >
              {item?.name}
            </Text>
            <View className="h-1" />
            <StarRating stars={item?.stars} size={13} />
          </View>
          <View className=" mt-4 flex-row justify-between items-center">
            <Price price={item.price} fontSize={hp(2.3)} color={theme.text} />
            <TouchableOpacity
              className=" bg-orange-500 rounded-lg p-2"
              onPress={() => addToCart(item)}
            >
              <Entypo color={"white"} name={"plus"} size={hp(2)} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
