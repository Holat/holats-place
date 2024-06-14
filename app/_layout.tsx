import { View, Text } from "react-native";
import React, { useEffect, useCallback } from "react";
import { Stack } from "expo-router";
import  authenticate  from "@/services/userService"
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartProvider from "@/context/CartProvider";
import AuthProvider from "@/context/AuthProvider";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [appIsReady, setAppIsReady] = useState();

  useEffect(() => {
  }, []);

  const onLayoutRootView = useCallback(async() => {
    if (appIsReady){
      await SplashScreen.hideAsync();
    }
  }, [appIsReady])

  if (!appIsReady){
    return null;
  }
  
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
            <Stack.Screen name="home" />
            <Stack.Screen name="[foodId]" options={{ presentation: "modal" }} />
          </Stack>
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
