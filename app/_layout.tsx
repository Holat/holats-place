import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartProvider from "@/context/CartProvider";
import Toast, { BaseToast } from "react-native-toast-message";
import "@/interceptors/networkErrorInterceptor";
import { BaseToastProps } from "react-native-toast-message";
import AuthProvider from "@/context/AuthProvider";
import { useEffect } from "react";
import { useAuth, useTheme } from "@/hooks";
import ThemeProvider from "@/context/ThemeProvider";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(home)",
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { user, authInitialized, authReady } = useAuth();
  const { theme } = useTheme();

  const toastConfig = {
    success: (props: BaseToastProps) => (
      <BaseToast
        {...props}
        style={{
          width: "95%",
          backgroundColor: theme.bkg2,
          borderLeftColor: theme.bkg2,
        }}
        contentContainerStyle={{
          width: "100%",
          padding: 10,
        }}
        text1Style={{ fontSize: 16, color: theme.text }}
        text2Style={{ fontSize: 12 }}
      />
    ),
  };

  useEffect(() => {
    (async () => {
      if (authReady) await SplashScreen.hideAsync();
    })();
  }, [authReady]);

  // const onLayoutRootView = useCallback(async () => {
  //   if (isAppReady) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [isAppReady]);

  if (!authInitialized && !user) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}
