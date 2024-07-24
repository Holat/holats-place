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
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(home)",
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { user, authInitialized, authReady } = useAuth();
  const { theme, cTheme } = useTheme();

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

  if (!authInitialized && !user) return null;
  return (
    <>
      <StatusBar style={cTheme === "light" ? "dark" : "light"} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <CartProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(home)" />
            <Stack.Screen
              name="details/[foodId]"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen name="[tag]" options={{ presentation: "modal" }} />
            <Stack.Screen name="checkout" options={{ presentation: "modal" }} />
            <Stack.Screen
              name="changePassword"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen
              name="updateProfile"
              options={{ presentation: "modal" }}
            />
          </Stack>
          <Toast config={toastConfig} visibilityTime={2000} />
        </CartProvider>
      </GestureHandlerRootView>
    </>
  );
}
