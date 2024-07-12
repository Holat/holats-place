import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { useAuth, useTheme } from "@/hooks";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { ThemeValueType } from "@/constants/types";
import Animated from "react-native-reanimated";

export default function Profile() {
  const { user } = useAuth();
  const { theme, rStyle, rBkg2Style, rTextStyle, value, setTheme } = useTheme();

  return (
    <Animated.View className="flex-1" style={rStyle}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          padding: 8,
        }}
        style={{ marginBottom: 80 }}
      >
        <Animated.View style={rBkg2Style} className="p-4 w-full rounded-2xl">
          <View className="items-center">
            <View className="w-20 h-20 mb-2">
              <Image
                source={require("@/assets/images/avatar.jpeg")}
                className="rounded-full w-full h-full"
              />
            </View>
            <Animated.Text className="text-xl font-bold " style={rTextStyle}>
              {user?.name}
            </Animated.Text>
            <Text className="text-neutral-600">{user?.email}</Text>
          </View>
        </Animated.View>
        <Animated.View
          className="mt-2 w-full rounded-2xl py-4 px-2"
          style={rBkg2Style}
        >
          <DetailsD title="Name" text={user?.name} b />
          <DetailsD title="Email" text={user?.email} b />
          <DetailsD title="Contact" text={user?.phone} b />
          <DetailsD title="Address" text={user?.address} />
        </Animated.View>
        <Animated.View
          className="flex-1 rounded-2xl mt-2 py-4 px-4 w-full"
          style={rBkg2Style}
        >
          <View>
            <Text className="text-neutral-600 font-semibold text-base">
              Select Theme
            </Text>
          </View>
          <View>
            {["light", "dark", "default"].map((item) => (
              <Pressable
                key={item}
                className="mt-5 flex-row justify-between items-center"
                onPress={() => setTheme(item as ThemeValueType)}
              >
                <Animated.Text
                  style={rTextStyle}
                  className="capitalize font-semibold text-base"
                >
                  {item}
                </Animated.Text>
                {item === value && (
                  <AntDesign name="checkcircle" color={"green"} size={24} />
                )}
              </Pressable>
            ))}
          </View>
        </Animated.View>
        <Animated.View
          className="flex-1 rounded-2xl mt-2 py-4 px-4 w-full"
          style={rBkg2Style}
        >
          <Text className="text-red-600 font-semibold text-base">Logout</Text>
        </Animated.View>
      </ScrollView>
    </Animated.View>
  );
}

const DetailsD = ({
  title,
  text,
  b,
}: {
  title: string;
  text?: string;
  b?: boolean;
}) => {
  return (
    <>
      <View className="flex-row items-center justify-between px-2 overflow-hidden">
        <View className="mr-5">
          <Text className="font-bold text-base text-neutral-700">{title}</Text>
        </View>
        <View>
          <Text
            className="text-neutral-500 font-semibold flex-shrink"
            numberOfLines={1}
          >
            {text}
          </Text>
        </View>
      </View>
      {b && (
        <View className="h-[1px] w-full bg-white opacity-5 self-center m-4" />
      )}
    </>
  );
};
