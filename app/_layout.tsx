import { View, Text } from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import { Redirect, Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartProvider from "@/context/CartProvider";
import Toast, { BaseToast } from "react-native-toast-message";
import "@/interceptors/networkErrorInterceptor";app/_layout.tsx
import { BaseToastProps } from "react-native-toast-message";
import useAuth from "@/hooks/useAuth";
import AuthProvider from "@/context/AuthProvider";

export const unstable_settings = {
  initialRouteName: "(home)",
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { user, authInitialized } = useAuth();

  const toastConfig = {
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

  if (!authInitialized && !user) return null;
  console.log(isAuthenticated, user);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <CartProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(home)" />
            <Stack.Screen name="[foodId]" options={{ presentation: "modal" }} />
          </Stack>
          <Toast config={toastConfig} />
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
