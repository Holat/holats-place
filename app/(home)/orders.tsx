import { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { Price } from "@/components";
import {
  OrderHistoryType,
  OrderCardType,
  CartItemType,
} from "@/constants/types";
import { getAll } from "@/services/orderServices";
import { SafeAreaView } from "react-native-safe-area-context";
import formatDate from "@/utils/formatedDate";
import { Image } from "expo-image";
import { getFoodImage } from "@/constants/data";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme, useCart } from "@/hooks";
import Animated from "react-native-reanimated";

export default function Orders() {
  const [orders, setOrders] = useState<OrderHistoryType[]>();
  const { addItemsToCart } = useCart();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const router = useRouter();
  const { theme, rStyle, rBkg2Style, rTextStyle } = useTheme();

  const fetchOrders = useCallback(async () => {
    setIsloading(true);
    getAll("")
      .then(setOrders)
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  const handleReOrder = (items: CartItemType[]) => addItemsToCart(items);

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Animated.View className="flex-1" style={rStyle}>
      <SafeAreaView className="flex-1">
        <Animated.View
          className="flex-row items-center pl-2 pr-3 py-2 mx-2 rounded-lg self-start"
          style={rBkg2Style}
        >
          <Pressable onPress={() => router.back()}>
            <AntDesign color={theme.text} name={"left"} size={24} />
          </Pressable>
          <Animated.Text className="font-bold text-lg ml-2" style={rTextStyle}>
            Orders
          </Animated.Text>
        </Animated.View>
        <FlatList
          className="mt-2 mx-2"
          data={orders}
          onRefresh={fetchOrders}
          refreshing={isLoading}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderSummaryCard
              key={item.id}
              item={item}
              theme={theme}
              rBkg2Style={rBkg2Style}
              rTextStyle={rTextStyle}
              handleReOrder={handleReOrder}
            />
          )}
          ListEmptyComponent={() =>
            isLoading ? (
              <></>
            ) : (
              <View className="mb-4 flex-1 justify-center items-center">
                <Text className="font-semibold text-lg text-neutral-300">
                  Empty
                </Text>
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </Animated.View>
  );
}

const OrderSummaryCard = ({
  item,
  theme,
  rBkg2Style,
  rTextStyle,
  handleReOrder,
}: OrderCardType) => {
  const { status, totalCount, totalPrice, createdAt, id, items, address } =
    item;
  const date = formatDate(createdAt);

  return (
    <Animated.View className="rounded-lg mb-2" style={rBkg2Style}>
      <View className="p-4">
        <View className="flex items-start mb-2">
          <Animated.Text className="text-lg font-bold" style={rTextStyle}>
            Order #{id}
          </Animated.Text>
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
            <Animated.Text
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
            </Animated.Text>
          </View>
        </View>
        <Animated.Text className="text-sm font-semibold" style={rTextStyle}>
          Total: <Price price={totalPrice} />
        </Animated.Text>
        <View className="flex-row items-start justify-between">
          <View className="">
            <Animated.Text className="text-sm font-semibold" style={rTextStyle}>
              Items: {totalCount}
            </Animated.Text>
            <Animated.Text className="text-sm font-semibold" style={rTextStyle}>
              Order Date: {date}
            </Animated.Text>
            <Animated.Text
              className="text-sm font-semibold"
              ellipsizeMode="tail"
              numberOfLines={1}
              style={rTextStyle}
            >
              Address: {address}
            </Animated.Text>
          </View>
        </View>
      </View>
      {items.map((item) => {
        const imgUrl = item.food.imageUrl.split("/").pop() || "";
        const key = item.food.id ? item.food.id : item.food._id;
        return (
          <View className="rounded-2xl mb-2 p-2 flex-row " key={key}>
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
                  {item.food.name}
                </Animated.Text>
                <Text className="font-semibold text-neutral-400">
                  x{item.quantity}
                </Text>
                <Price price={item.price} color={theme.text} />
              </View>
            </View>
          </View>
        );
      })}
      <Pressable
        className="rounded py-1 px-2 m-2 self-end bg-[#FA6400]"
        onPress={() => handleReOrder(items)}
      >
        <Text className="text-white font-semibold">Re-order</Text>
      </Pressable>
    </Animated.View>
  );
};
