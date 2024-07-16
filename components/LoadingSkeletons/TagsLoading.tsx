import { View } from "react-native";
import RoundedShimmer from "./RoundedShimmer";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function TagsLoading() {
  const tagPlaceHolder = ["01", "02", "03", "04", "05"];
  return (
    <Animated.ScrollView
      entering={FadeIn}
      exiting={FadeOut}
      className="flex"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {tagPlaceHolder.map((tag) => (
        <View className="mr-3 text" style={{ marginVertical: 4 }} key={tag}>
          <RoundedShimmer w={80} r h={36} />
        </View>
      ))}
    </Animated.ScrollView>
  );
}
