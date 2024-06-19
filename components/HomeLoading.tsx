import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SkeletonLoading from 'react-native-skeleton-loading'
import { SafeAreaView } from "react-native-safe-area-context";


// npx expo install react-native-skeleton-loading
// npx expo start --clear
export default function HomeLoading(){

  return(
    <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
      <Card width=50 height=30/>
      <Card  width=50 height=39 />
      <Card width=50 height=30/>
    </SkeletonLoading>
  )

};

const Card = ({ height, width }: { height: number, width: number }) => {
  return (
    <View 
      style={{ width: wp(width), height: hp(height), backgroundColor: "#adadad" }}
      className=" rounded-[26px] bg-white p-4"
    >
      <View style={{ backgroundColor: "#adadad" }} className="flex-1 rounded-[20px] w-full" />
      <View className="mt-2">
        <View/>
        <StarRating stars={item.stars} size={13} />
      </View>
      <View className="mt-4 flex-row justify-between items-center">
        <View style={{ backgroundColor: "#adadad" }} />
        <View style={{ backgroundColor: "#adadad" }}  className="rounded-lg p-2">
          <Entypo color={"white"} name={"plus"} size={hp(2)} />
        </View>
      </View>
    </View>
  );
};
