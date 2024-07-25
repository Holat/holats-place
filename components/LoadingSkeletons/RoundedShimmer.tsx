import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import { useTheme } from "@/hooks";

export const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const RoundedShimmer = ({
  w,
  h,
  r,
}: {
  w?: number | string;
  h?: number;
  r?: boolean;
}) => {
  const { cTheme } = useTheme();
  const sh = cTheme === "dark" ? "#333" : "#ebebeb";
  const bc = cTheme === "dark" ? "#444" : "#c5c5c5";

  return (
    <View className={` ${r ? "rounded-3xl" : "rounded-lg"} overflow-hidden`}>
      <ShimmerPlaceHolder
        style={{ height: h ? h : "100%", width: w ? w : "100%" }}
        shimmerColors={[sh, bc, sh]}
      />
    </View>
  );
};

export default RoundedShimmer;
