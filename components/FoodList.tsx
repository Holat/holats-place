import { View, Pressable, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Price from "./Price";
import StarRating from "./Star";
import Carousel from "react-native-snap-carousel";
import { FoodItemType, FoodCardItemType } from "@/constants/types";
import { getFoodImage } from "@/constants/data";
import { Entypo } from "@expo/vector-icons";
import { useCart, useTheme } from "@/hooks";
import Animated from "react-native-reanimated";

export default function FoodList({ data }: { data: FoodItemType[] }) {
  const { addToCart } = useCart();
  const {
    rBkg2Style,
    rTextStyle,
    theme: { text },
  } = useTheme();

  return (
    <Carousel
      data={data}
      keyExtractor={(item) => item?.id as string}
      renderItem={({ item, index }) => (
        <FoodCard
          item={item}
          key={item?.id}
          addToCart={addToCart}
          rBkg2Style={rBkg2Style}
          rTextStyle={rTextStyle}
          color={text}
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

export const FoodCard = ({
  item,
  addToCart,
  rBkg2Style,
  rTextStyle,
  color,
}: FoodCardItemType) => {
  const router = useRouter();
  const imgUrl = item.imageUrl.split("/").pop() || "";

  return (
    <Pressable
      onPress={() =>
        router.navigate({
          pathname: "/details/[foodId]",
          params: { foodId: item.id },
        })
      }
      className="shadow-lg"
    >
      <Animated.View
        style={[
          {
            width: wp(50),
            height: 304, // hp(39)
          },
          rBkg2Style,
        ]}
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
            <Animated.Text
              className=" font-bold"
              style={[{ fontSize: hp(2.3) }, rTextStyle]}
            >
              {item?.name}
            </Animated.Text>
            <View className="h-1" />
            <StarRating stars={item?.stars} size={13} />
          </View>
          <View className=" mt-4 flex-row justify-between items-center">
            <Price price={item.price} fontSize={hp(2.3)} color={color} />
            <TouchableOpacity
              className=" bg-orange-500 rounded-lg p-2"
              onPress={() => addToCart(item)}
            >
              <Entypo color={"white"} name={"plus"} size={hp(2)} />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};
