import React from "react";
import HomeCardLoading from "./HomeCardLoading";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { View } from "react-native";

const SearchLoading = ({ backgroundColor }: { backgroundColor: string }) => {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className="flex-1 w-full flex "
    >
      {Array(10)
        .fill("i")
        .map((k, i) => (
          <View style={{ marginBottom: 18 }} key={i + k}>
            <HomeCardLoading backgroundColor={backgroundColor} />
          </View>
        ))}
    </Animated.View>
  );
};
export default SearchLoading;
