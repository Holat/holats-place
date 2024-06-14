import { View, Text, LogBox } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartProvider from "@/context/CartProvider";
import AuthProvider from "@/context/AuthProvider";
import Toast, { BaseToast } from "react-native-toast-message";
import "@/interceptors/networkErrorInterceptor";
import { BaseToastProps } from "react-native-toast-message";

export default function Layout() {
  const toastConfig = {
    // customToast: ({text1, text2, props}: {text1: string, }) => (
    //   <View className="w-full bg-white rounded">
    //     <Text>{text1}</Text>
    //     <Text>{text2}</Text>
    //   </View>
    // )

    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{
          width: "95%",
          backgroundColor: "white",
          borderLeftColor: "#FA6400",
        }}
        contentContainerStyle={{
          width: "100%",
          padding: 10,
        }}
        text1Style={{ fontSize: 16 }}
        text2Style={{ fontSize: 12 }}
      />
    ),
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <CartProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="home" />
            <Stack.Screen name="[foodId]" options={{ presentation: "modal" }} />
          </Stack>
          <Toast config={toastConfig} />
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
