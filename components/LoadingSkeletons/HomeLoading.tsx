import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RoundedShimmer from "./RoundedShimmer";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

const HomeLoading = ({ bkg }: { bkg: string }) => {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut.duration(1000).delay(500)}
      className="flex items-center justify-center"
    >
      <View className="flex-row items-center justify-between">
        <FoodListSkeletonCard type={"s"} bkg={bkg} />
        <FoodListSkeletonCard type={"b"} bkg={bkg} />
        <FoodListSkeletonCard type={"s"} bkg={bkg} />
      </View>
    </Animated.View>
  );
};

export default HomeLoading;

const FoodListSkeletonCard = ({
  type,
  bkg,
}: {
  type: "s" | "b";
  bkg: string;
}) => {
  return (
    <View
      style={{
        width: wp(50),
        height: hp(type === "s" ? 37 : 39),
        marginHorizontal: type === "b" ? 26 : 0,
        backgroundColor: bkg,
      }}
      className=" rounded-[20px] p-4"
    >
      <View className="w-full h-40 rounded-[10px] justify-center items-center overflow-hidden ">
        <View className="absolute z-10">
          <Ionicons name="image-outline" size={42} color={bkg} />
        </View>
        <RoundedShimmer />
      </View>
      <View className=" mt-2 flex items-start">
        <RoundedShimmer w={120} h={20} />
        <View className="h-1" />
        <RoundedShimmer w={100} h={20} />
      </View>
      <View className=" mt-4 flex-row justify-between items-center">
        <RoundedShimmer w={100} h={20} />
        <RoundedShimmer w={32} h={32} />
      </View>
    </View>
  );
};
