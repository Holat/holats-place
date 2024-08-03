import { View, Text, Pressable, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

export default function CustomDrawer(props: any) {
  const { user, logout, tValue } = props;
  const color = tValue === "dark" ? "#fff" : "#000";
  const handleLogOut = async () => await logout("n");

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center justify-between p-3">
        <View>
          <Text className="font-bold text-lg" style={{ color }}>
            {user?.name}
          </Text>
          <Text className="text-neutral-600">{user?.email}</Text>
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
        onPress={handleLogOut}
        className="flex-row items-center p-5 mb-2"
      >
        <AntDesign color={"#FA6400"} name={"logout"} size={hp(3)} />
        <Text className="text-neutral-600 ml-3 font-bold text-lg">Log Out</Text>
      </Pressable>
    </SafeAreaView>
  );
}
