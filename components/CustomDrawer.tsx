import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AntDesign from "react-native-vector-icons/AntDesign";
import useAuth from "@/hooks/useAuth";
import {
  widthPercentageToDP as wp,
  // heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CustomDrawer(props: any) {
  const { user } = useAuth();
  return (
    <View className=" bg-white flex-1">
      <View className="flex-row items-center justify-between">
        <View>
          <Text>{user?.name}</Text>
          <Text>{user?.email}</Text>
        </View>
        <View
          className=" rounded-full overflow-hidden"
          style={{ width: wp(15), height: wp(15) }}
        >
          <Image
            resizeMode="contain"
            source={require("../assets/images/avatar.jpeg")}
            className=" w-full h-full rounded-full"
          />
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <Pressable>
        <AntDesign color={"#FA6400"} name={"exclamationcircleo"} />
        <Text>Log Out</Text>
      </Pressable>
    </View>
  );
}
