import { Price } from "@/components";
import { CartItemType, ThemeType } from "@/constants/types";
import { getAll } from "@/services/orderServices";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import formatDate from "@/services/formatedDate";
import { Image } from "expo-image";
import { getFoodImage } from "@/constants/data";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks";

type OrderHistoryType = {
  _id: string;
  address: string;
  totalPrice: number;
  totalCount: number;
  createdAt: string;
  status: string;
  items: CartItemType[];
};

export default function Orders() {
  const [orders, setOrders] = useState<OrderHistoryType[]>();
  const [currentStatus, setCurrentStatus] = useState("");
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    getAll(currentStatus)
      .then(setOrders)
      .catch((error) => {
        console.log(error);
      });
  }, [currentStatus]);

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <SafeAreaView className="flex-1">
        <View
          className="flex-row items-center pl-2 pr-3 py-2 mx-2 rounded-lg self-start"
          style={{ backgroundColor: theme.bkg2 }}
        >
          <Pressable onPress={() => router.back()}>
            <AntDesign color={theme.text} name={"left"} size={24} />
          </Pressable>
          <Text
            className="font-bold text-lg ml-2"
            style={{ color: theme.text }}
          >
            Orders
          </Text>
        </View>
        <ScrollView className="m-2" showsVerticalScrollIndicator={false}>
          {orders ? (
            orders.map((item) => (
              <OrderSummaryCard key={item._id} item={item} theme={theme} />
            ))
          ) : (
            <View className="mb-4">
              <Text>Empty</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const OrderSummaryCard = ({
  item,
  theme,
}: {
  item: OrderHistoryType;
  theme: ThemeType;
}) => {
  const { status, totalCount, totalPrice, createdAt, _id, items, address } =
    item;
  const date = formatDate(createdAt);

  return (
    <View className="rounded-lg mb-2" style={{ backgroundColor: theme.bkg2 }}>
      <View className="p-4">
        <View className="flex items-start mb-2">
          <Text className="text-lg font-bold" style={{ color: theme.text }}>
            Order #{_id}
          </Text>
          <View
            style={{
              backgroundColor:
                status === "PAYED"
                  ? theme.payed
                  : status === "NEW"
                  ? theme.new
                  : status === "FAILED"
                  ? theme.failed
                  : theme.accentV,
            }}
            className="px-2 py-1 rounded-lg mt-1"
          >
            <Text
              style={{
                color:
                  status === "PAYED"
                    ? "#00A300"
                    : status === "NEW"
                    ? "#1434A4"
                    : status === "FAILED"
                    ? "#ff0000"
                    : "#FA6400",
              }}
              className="font-bold"
            >
              {status}
            </Text>
          </View>
        </View>
        <Text className="text-sm font-semibold" style={{ color: theme.text }}>
          Total: <Price price={totalPrice} />
        </Text>
        <View className="flex-row items-start justify-between">
          <View className="">
            <Text
              className="text-sm font-semibold"
              style={{ color: theme.text }}
            >
              Items: {totalCount}
            </Text>
            <Text
              className="text-sm font-semibold"
              style={{ color: theme.text }}
            >
              Order Date: {date}
            </Text>
            <Text
              className="text-sm font-semibold"
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ color: theme.text }}
            >
              Address: {address}
            </Text>
          </View>
        </View>
      </View>
      {items.map((item) => {
        const imgUrl = item.food.imageUrl.split("/").pop() || "";

        return (
          <View className="rounded-2xl mb-2 p-2 flex-row " key={item.food.id}>
            <View className="mr-3">
              <Image
                source={getFoodImage(imgUrl)}
                className="h-20 w-20 rounded-xl"
                contentFit="cover"
              />
            </View>
            <View className="flex justify-between flex-1">
              <View>
                <Text className="text-base" style={{ color: theme.text }}>
                  {item.food.name}
                </Text>
                <Text className="font-semibold text-neutral-400">
                  x{item.quantity}
                </Text>
                <Price price={item.price} color={theme.text} />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
// 001a66
// 660000
