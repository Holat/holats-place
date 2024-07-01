import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PaymentBtn } from "@/components";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const { cart } = useCart();
  const { user } = useAuth();

  const order = {
    name: user?.name,
    address: user?.address,
    lat: 123,
    lng: 123,
    status: "new",
    email: user?.email,
    phonenumber: user?.phone,
    ...cart,
  };

  return (
    <SafeAreaView className="flex-1 flex">
      <Text>Cart</Text>
      <View>
        <PaymentBtn order={order} />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
