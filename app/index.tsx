import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Image } from "expo-image";

export default function Index() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  return (
    <View className=" flex-1 flex justify-end">
      <StatusBar barStyle={"light-content"} />
      <Image
        source={require("@/assets/images/bg.jpg")}
        className=" flex-1 absolute h-full w-full"
        contentFit="cover"
        cachePolicy={"disk"}
      />
      <LinearGradient
        colors={["transparent", "#18181b"]}
        style={{ width: wp(100), height: hp(100) }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.95 }}
        className="flex items-center pb-12 space-y-8 justify-between flex-1"
      >
        <Animated.Image
          entering={FadeInUp.duration(200).springify()}
          source={require("../assets/images/logo.png")}
          style={{ height: hp(8), width: hp(8), marginTop: top + 30 }}
          className="justify-start self-start ml-[30px]"
        />
        <View className=" gap-5">
          <Animated.View entering={FadeInDown.duration(100).springify()}>
            <TouchableOpacity
              onPress={() => router.push({ pathname: "/login" })}
              style={{ height: hp(6), width: wp(80) }}
              className=" bg-orange-500 flex items-center justify-center rounded-full  border-neutral-200"
            >
              <Text
                className=" text-white font-semibold"
                style={{ fontSize: hp(2) }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(100).delay(100).springify()}
          >
            <TouchableOpacity
              style={{ height: hp(6), width: wp(80) }}
              className="flex items-center justify-center rounded-full border-[1px] border-orange-500"
            >
              <Text
                className=" text-white font-semibold"
                style={{ fontSize: hp(2) }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
}
