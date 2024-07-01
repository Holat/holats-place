import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import RoundedShimmer, { ShimmerPlaceHolder } from "./RoundedShimmer";
import { Ionicons } from "@expo/vector-icons";

const HomeCardLoading = () => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <View className="flex-row bg-white rounded-xl overflow-hidden">
        <View style={styles.container}>
          <ShimmerPlaceHolder style={{ height: 120, width: "100%" }} />
          <View className="absolute z-10">
            <Ionicons name="image-outline" size={30} color={"white"} />
          </View>
          <View style={styles.triangleCorner} />
        </View>
        <View className="flex-1 p-3">
          <View className="items-start">
            <RoundedShimmer w={170} h={20} />
            <View className="h-1" />
            <RoundedShimmer w={80} h={20} />
          </View>
          <View className="flex-row items-center justify-between mt-3">
            <RoundedShimmer w={50} h={20} />
            <RoundedShimmer w={35} h={35} />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default HomeCardLoading;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    backgroundColor: "#ecf0f1",
    overflow: "hidden",
  },
  triangleCorner: {
    position: "absolute",
    right: -70,
    height: 100,
    width: 100,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 30,
    borderBottomWidth: 120,
    borderLeftColor: "transparent",
    borderBottomColor: "white",
  },
});
