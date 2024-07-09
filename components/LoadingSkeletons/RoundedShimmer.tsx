import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

export const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);
const RoundedShimmer = ({
  w,
  h,
  r,
}: {
  w?: number;
  h?: number;
  r?: boolean;
}) => {
  return (
    <View className={` ${r ? "rounded-3xl" : "rounded-lg"} overflow-hidden`}>
      <ShimmerPlaceHolder
        style={{ height: h ? h : "100%", width: w ? w : "100%" }}
      />
    </View>
  );
};

export default RoundedShimmer;
