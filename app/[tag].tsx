import { View, Text, Pressable } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FoodCard } from "@/components/FoodList.tsx";
import { FoodItemType } from "@/constants/types";
import { getAllByTag } from "@/services/foodService";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useTheme, useCart } from "@/hooks";

export default function Category() {
  const { tag } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [foodItems, setFoodItems] = useState<FoodItemType[]>();
  const { addToCart } = useCart();
  const router = useRouter();
  const {
    theme: { text },
    rStyle,
    rTextStyle,
  } = useTheme();

  const fetchFoodItems = useCallback(async () => {
    getAllByTag(tag || "All")
      .then(setFoodItems)
      .catch((error) => {
        router.back();
        console.log(error);
      });
  }, [foodId]);

  useEffect(() => {
    fetchFoodItem();
  }, [fetchFoodItem]);

  return (
    <View className="flex-1">
      <SafeAreaView>
        <FlatList
          data={foodItems}
          numColumns={2}
          renderItem={({ item }) => (
            <FoodCard
              key={item.id}
              item={item}
              addToCart={addToCart}
              rBkg2Style={rBkg2Style}
              rTextStyle={rTextStyle}
              color={text}
            />
          )}
          onRefresh={fetchFoodItems}
          refreshing={isLoading}
        />
      </SafeAreaView>
    </View>
  );
}
