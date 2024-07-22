import { View, StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import RoundedShimmer from "./RoundedShimmer";
import { Ionicons } from "@expo/vector-icons";

const HomeCardLoading = ({ backgroundColor }: { backgroundColor: string }) => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <View
        className="flex-row rounded-xl overflow-hidden"
        style={{ backgroundColor }}
      >
        <View style={styles.container}>
          <RoundedShimmer h={120} w={"100%"} />
          <View className="absolute z-10">
            <Ionicons name="image-outline" size={30} color={backgroundColor} />
          </View>
          <View
            style={[
              styles.triangleCorner,
              { borderBottomColor: backgroundColor },
            ]}
          />
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
  },
});
