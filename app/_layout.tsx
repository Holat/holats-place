import { Redirect, Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartProvider from "@/context/CartProvider";
import Toast, { BaseToast } from "react-native-toast-message";
import "@/interceptors/networkErrorInterceptor";
import { BaseToastProps } from "react-native-toast-message";
import AuthProvider from "@/context/AuthProvider";
import { useCallback } from "react";
import { useAuth, useTheme } from "@/hooks";
import ThemeProvider from "@/context/ThemeProvider";

SplashScreen.preventAutoHideAsync();

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
  const { user, authInitialized, authReady } = useAuth();

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{
          width: "95%",
          backgroundColor: "white",
          borderLeftColor: "white",
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

  console.log(authReady);
  const onLayoutRootView = useCallback(async () => {
    if (authReady) {
      await SplashScreen.hideAsync();
    }
  }, [authReady]);

  if (!authInitialized && !user) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <CartProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(home)" />
            <Stack.Screen name="[foodId]" options={{ presentation: "modal" }} />
            <Stack.Screen name="checkout" options={{ presentation: "modal" }} />
          </Stack>
          <Toast config={toastConfig} visibilityTime={2000} />
        </CartProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
