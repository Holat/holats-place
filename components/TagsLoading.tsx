import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

// npx expo install react-native-skeleton-loading
// // npx expo start --clear
// export default function TagsLoading(){
//   return(
//     <SkeletonLoading background={"#adadad"} highlight={"#ffffff"}>
//       {
//         Array(8).fill("x").map((item, index) =>
//           <View className="bg-neutral-200 rounded-3xl px-4 py-1 mr-3"
//             style={{
//               backgroundColor: "#adadad",
//               marginVertical: 4,
//           }}/>
//       )}
//     </SkeletonLoading>
//   )
// };
