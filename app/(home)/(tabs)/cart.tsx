import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Price } from "@/components";
import { useTheme, useCart } from "@/hooks";
import { ScrollView } from "react-native-gesture-handler";
import { CartItemType } from "@/constants/types";
import { Image } from "expo-image";
import { getFoodImage } from "@/constants/data";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated from "react-native-reanimated";

const Cart = () => {
  const {
    cart: { items, totalCount, totalPrice },
    clearCart,
    removeFromCart,
  } = useCart();
  const router = useRouter();
  const { theme, value, rStyle, rBkg2Style, rTextStyle } = useTheme();

  return (
    <Animated.View className="flex-1" style={rStyle}>
      <SafeAreaView className="flex-1">
        <View className="flex-row px-2 mt-2 items-center justify-between">
          <Animated.View
            className="flex-row  rounded-lg items-center  p-2 h-full"
            style={rBkg2Style}
          >
            <Text className="text-neutral-500 ">Count</Text>
            <View className="bg-[#FA6400] rounded w-6 h-6 items-center justify-center ml-2">
              <Text className="text-white font-bold">{totalCount}</Text>
            </View>
          </Animated.View>
          <Animated.View
            className="flex-1  rounded-lg mx-2 items-center py-2"
            style={rBkg2Style}
          >
            <Animated.Text style={rTextStyle} className="text-lg font-bold">
              Cart
            </Animated.Text>
          </Animated.View>
          <Animated.View style={rBkg2Style} className="h-full">
            <Pressable
              disabled={items.length === 0 || !items}
              onPress={clearCart}
              className="flex-row rounded-lg items-center  p-3 h-full"
            >
              <Animated.Text className="font-semibold mr-1" style={rTextStyle}>
                Clear Cart
              </Animated.Text>
            </Pressable>
          </Animated.View>
        </View>
        {items.length > 0 ? (
          <AnimatedView
            className="mt-2 flex-1 mb-20 rounded-3xl overflow-hidden"
            style={rBkg2Style}
          >
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
                  rTextStyle={rTextStyle}
                />
              ))}
            </ScrollView>
            <View className="p-3">
              <View className="flex-row items-center justify-between pl-1">
                <View>
                  <Text className="text-neutral-500">Total</Text>
                  <Price price={totalPrice} fontSize={18} color={theme.text} />
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
          </AnimatedView>
        ) : (
          <Animated.View
            className="mt-2 flex-1 mb-20 rounded-3xl items-center justify-center"
            style={rBkg2Style}
          >
            {value === "dark" ? (
              <Image
                source={require("@/assets/images/emptD.png")}
                className="w-52 h-52 opacity-80"
              />
            ) : (
              <Image
                source={require("@/assets/images/emptL.png")}
                className="w-52 h-52 opacity-80"
              />
            )}

            <Text className="font-semibold text-lg text-neutral-300">
              Your cart empty!
            </Text>
          </Animated.View>
        )}
      </SafeAreaView>
    </Animated.View>
  );
};

export default Cart;

const Card = ({ item, removeFromCart, rTextStyle }: CartCardType) => {
  const {
    food: { imageUrl, name, id },
    quantity,
    price,
  } = item;
  const router = useRouter();
  const imgUrl = imageUrl?.split("/").pop() || "";

  return (
    <Pressable
      className="rounded-2xl mb-2 p-2 flex-row "
      onPress={() =>
        router.push({
          pathname: "/[foodId]",
          params: { foodId: id },
        })
      }
    >
      <View className="mr-3">
        <Image
          source={getFoodImage(imgUrl)}
          className="h-20 w-20 rounded-xl"
          contentFit="cover"
        />
      </View>
      <View className="flex justify-between flex-1">
        <View>
          <Animated.Text className="text-base" style={rTextStyle}>
            {name}
          </Animated.Text>
          <Price price={price} color={color} />
        </View>
        <View className="flex-row items-center justify-end w-full">
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
        </View>
      </View>
    </Pressable>
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

/* 
  changeQuantity,
    const [quantity, setQuantity] = useState(initialQuantity);
    changeQuantity: (id: CartItemType, n: number) => void;
    const handleQuantityIncrease = useCallback(() => {
      setQuantity(quantity + 1);
      changeQuantity(item, quantity);
    }, [quantity]);

    const handleQuantityDecrease = useCallback(() => {
      setQuantity(quantity > 1 ? quantity - 1 : 1);
      changeQuantity(item, quantity);
    }, [quantity]);


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
  </View> */
