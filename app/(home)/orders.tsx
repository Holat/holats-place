import { Price } from "@/components";
import { CartItemType } from "@/constants/types";
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

  useEffect(() => {
    getAll(currentStatus)
      .then(setOrders)
      .catch((error) => {
        console.log(error);
      });
  }, [currentStatus]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center pl-2 pr-3 py-2 bg-white mx-2 rounded-lg self-start">
        <Pressable onPress={() => router.back()}>
          <AntDesign color={"black"} name={"left"} size={24} />
        </Pressable>
        <Text className="font-bold text-lg ml-2">Orders</Text>
      </View>
      <ScrollView className="m-2" showsVerticalScrollIndicator={false}>
        {orders ? (
          orders.map((item) => <OrderSummaryCard key={item._id} item={item} />)
        ) : (
          <View className="mb-4">
            <Text>Empty</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const OrderSummaryCard = ({ item }: { item: OrderHistoryType }) => {
  const { status, totalCount, totalPrice, createdAt, _id, items, address } =
    item;
  const [showDetails, setShowDetails] = useState(false);
  const date = formatDate(createdAt);

  const handleCardPress = () => {
    setShowDetails(!showDetails);
  };

  return (
    <View className="bg-white rounded-lg mb-2">
      <View className="p-4">
        <View className="flex items-start mb-2">
          <Text className="text-lg font-bold">Order #{_id}</Text>
          <View
            style={{
              backgroundColor:
                status === "PAYED"
                  ? "#eaffea"
                  : status === "NEW"
                  ? "#D9E3F5"
                  : status === "FAILED"
                  ? "#ffe5e5"
                  : "#FFE6CC",
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
        <Text className="text-sm font-semibold">
          Total: <Price price={totalPrice} />
        </Text>
        <View className="flex-row items-start justify-between">
          <View className="">
            <Text className="text-sm font-semibold">Items: {totalCount}</Text>
            <Text className="text-sm font-semibold">Order Date: {date}</Text>
            <Text
              className="text-sm font-semibold"
              ellipsizeMode="tail"
              numberOfLines={1}
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
                <Text className="text-base">{item.food.name}</Text>
                <Text className="font-semibold text-neutral-400">
                  x{item.quantity}
                </Text>
                <Price price={item.price} />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};
