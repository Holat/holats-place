import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAuth, useTheme } from "@/hooks";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function CustomDrawer(props: any) {
  const { user, logout } = props;

  const handleLogOut = () => {
    logout("n");
    router.replace("/(auth)/login2");
  };

  return (
    <SafeAreaView className=" bg-white flex-1">
      <View className="flex-row items-center justify-between p-3">
        <View>
          <Text className="font-bold text-lg">{user?.name}</Text>
          <Text>{user?.email}</Text>
        </View>
        <View
          className=" rounded-full overflow-hidden"
          style={{ width: hp(6), height: hp(6) }}
        >
          <Image
            source={require("../assets/images/avatar.jpeg")}
            className=" w-full h-full rounded-full"
          />
        </View>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          paddingTop: 4,
          paddingStart: 0,
          paddingEnd: 0,
        }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Pressable
        onPress={() => handleLogOut()}
        className="flex-row items-center p-5"
      >
        <Ionicons color={"#FA6400"} name={"log-out-outline"} size={hp(4)} />
        <Text className="ml-3 font-bold text-lg">Log Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}
