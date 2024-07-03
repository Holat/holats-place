import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Price } from "@/components";
import useCart from "@/hooks/useCart";
import { ScrollView } from "react-native-gesture-handler";
import { CartItemType } from "@/constants/types";
import { Image } from "expo-image";
import { getFoodImage } from "@/constants/data";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  // widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Cart = () => {
  const {
    cart: { items, totalCount, totalPrice },
    clearCart,
    removeFromCart,
    changeQuantity,
  } = useCart();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row px-2 mt-2 items-center justify-between">
        <View className="flex-row  rounded-lg items-center  bg-white p-2 h-full">
          <Text className="text-neutral-500 ">Count</Text>
          <View className="bg-[#FA6400] rounded w-6 h-6 items-center justify-center ml-2">
            <Text className="text-white font-bold">{totalCount}</Text>
          </View>
        </View>
        <View className="flex-1 bg-white rounded-lg mx-2 items-center py-2">
          <Text className="text-lg font-bold">Cart</Text>
        </View>
        <Pressable
          onPress={clearCart}
          className="flex-row rounded-lg items-center  bg-white p-3 h-full"
        >
          <Text className="font-semibold mr-1">Clear Cart</Text>
        </Pressable>
      </View>
      <View className="mt-2 flex-1 bg-white mb-24 rounded-3xl overflow-hidden">
        <ScrollView
          className="mt-1 flex-1"
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingTop: 8,
          }}
        >
          {items.map((item) => (
            <Card
              key={item.food.id}
              item={item}
              removeFromCart={removeFromCart}
              changeQuantity={changeQuantity}
            />
          ))}
        </ScrollView>
        <View className="p-3">
          <View className="flex-row items-center justify-between pl-1">
            <View>
              <Text className="text-neutral-500">Total</Text>
              <Price price={totalPrice} fontSize={18} />
            </View>
            <Pressable
              onPress={() => router.push("/checkout")}
              className="bg-[#FA6400] rounded-2xl py-3 px-12"
            >
              <Text className="text-white font-semibold text-base">
                Check Out
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const Card = ({
  item,
  removeFromCart,
  changeQuantity,
}: {
  item: CartItemType;
  removeFromCart: (id: string | number) => void;
  changeQuantity: (id: CartItemType, n: number) => void;
}) => {
  const {
    food: { imageUrl, name, id },
    quantity: initialQuantity,
    price,
  } = item;
  const [quantity, setQuantity] = useState(initialQuantity);
  const imgUrl = imageUrl?.split("/").pop() || "";

  const handleQuantityIncrease = useCallback(() => {
    setQuantity(quantity + 1);
    changeQuantity(item, quantity);
  }, [quantity]);

  const handleQuantityDecrease = useCallback(() => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
    changeQuantity(item, quantity);
  }, [quantity]);

  return (
    <View className="rounded-2xl mb-2 p-2 flex-row ">
      <View className="mr-3">
        <Image
          source={getFoodImage(imgUrl)}
          className="h-20 w-20 rounded-xl"
          contentFit="cover"
        />
      </View>
      <View className="flex justify-between flex-1">
        <View>
          <Text className="text-base">{name}</Text>
          <Price price={price} />
        </View>
        <View className="flex-row items-center justify-between w-full">
          <Pressable
            onPress={() => removeFromCart(id)}
            className="flex-row items-center"
          >
            <MaterialCommunityIcons
              name="cart-remove"
              size={hp(3)}
              color={"#FA6400"}
            />
          </Pressable>
          <View className="flex-row justify-between items-center w-24 p-1">
            <TouchableOpacity
              className="bg-[#FA6400] px-1 rounded-md  w-6 h-6 justify-center"
              onPress={handleQuantityDecrease}
            >
              <AntDesign color={"white"} name={"minus"} size={hp(2)} />
            </TouchableOpacity>
            <View>
              <Text
                className="text-neutral-800 font-semibold"
                style={{ fontSize: hp(2) }}
              >
                {quantity}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-[#FA6400] px-1 rounded-md  w-6 h-6 justify-center"
              onPress={handleQuantityIncrease}
            >
              <AntDesign color={"white"} name={"plus"} size={hp(2)} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadown: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
});
