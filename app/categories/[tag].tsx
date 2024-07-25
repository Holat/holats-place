import { View, FlatList, Pressable } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FoodItemType } from "@/constants/types";
import { getAllByTag } from "@/services/foodService";
import { useTheme, useCart } from "@/hooks";
import Animated from "react-native-reanimated";
import { Card } from "@/components";
import { AntDesign } from "@expo/vector-icons";

export default function Category() {
  const { tag } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [foodItems, setFoodItems] = useState<FoodItemType[]>();
  const { top } = useSafeAreaInsets();
  const { addToCart } = useCart();
  const router = useRouter();
  const {
    theme: { text, bkg2 },
    rBkg2Style,
    rTextStyle,
    rStyle,
  } = useTheme();

  const fetchFoodItems = async () => {
    setIsLoading(true);
    getAllByTag(tag.toString())
      .then(setFoodItems)
      .catch((error) => {
        router.back();
        console.log(error);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFoodItems();
  }, [fetchFoodItems]);

  return (
    <Animated.View className="flex-1" style={rStyle}>
      <View
        className="flex-row justify-between items-center pb-3 mb-4 px-3"
        style={{ paddingTop: top + 8 }}
      >
        <Pressable onPress={router.back}>
          <AntDesign name="left" color={text} size={24} />
        </Pressable>
        <Animated.Text style={rTextStyle} className="font-bold text-xl">
          {tag ? tag : "Catergory"}
        </Animated.Text>
        <View className="w-6" />
      </View>
      <FlatList
        data={foodItems}
        className="px-4 mb-4"
        renderItem={({ item }) => (
          <Card
            key={item.id}
            item={item}
            handleAddToCart={() => addToCart}
            rBkg2Style={rBkg2Style}
            rTextStyle={rTextStyle}
            color={[text, bkg2]}
            // w={49}
          />
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
        onRefresh={fetchFoodItems}
        refreshing={isLoading}
      />
    </Animated.View>
  );
}
