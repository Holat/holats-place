import { Image } from "expo-image";
import { getFoodImage } from "@/constants/data";
import Price from "@/components/Price";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FoodItemType, ThemeType } from "@/constants/types";
import { useRouter } from "expo-router";

const Card = ({
  item,
  handleAddToCart,
  theme,
}: {
  item: FoodItemType;
  handleAddToCart: (item: FoodItemType) => void;
  theme: ThemeType;
}) => {
  const router = useRouter();
  const imgUrl = item?.imageUrl.split("/").pop() || "";

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/[foodId]",
          params: { foodId: item?.id },
        });
      }}
    >
      <View
        className="flex-row rounded-xl overflow-hidden"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
          backgroundColor: theme.bkg2,
        }}
      >
        {/* <View className="w-24" style={{}}></View>
         */}
        <View style={styles.container}>
          <Image
            style={{ aspectRatio: 3 / 3.7 }}
            source={getFoodImage(imgUrl)}
            className="w-full"
            contentFit="cover"
          />
          <View
            style={[styles.triangleCorner, { borderBottomColor: theme.bkg2 }]}
          ></View>
        </View>
        <View className="flex-1 p-3">
          <Text
            numberOfLines={1}
            style={{ color: theme.text }}
            ellipsizeMode="middle"
            className="text-lg"
          >
            {item?.name}
          </Text>
          <Price price={item?.price} fontSize={hp(2)} color={theme.text} />
          <View className="flex-row items-center mt-3">
            <View className="flex-row items-center gap-2 flex-1">
              <AntDesign name="star" size={hp(3)} color={"#FA6400"} />
              <Text
                className="font-bold"
                style={{ fontSize: hp(2.3), color: theme.text }}
              >
                {item?.stars}
              </Text>
            </View>
            <TouchableOpacity
              className=" bg-orange-500 rounded-lg p-2"
              style={{ width: hp(3.8), height: hp(3.8) }}
              onPress={() => handleAddToCart(item)}
            >
              <Entypo color={"white"} name={"plus"} size={hp(2)} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

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
