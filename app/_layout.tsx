import { Redirect, Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CartProvider from "@/context/CartProvider";
import Toast, { BaseToast } from "react-native-toast-message";
import "@/interceptors/networkErrorInterceptor";
import { BaseToastProps } from "react-native-toast-message";
import useAuth from "@/hooks/useAuth";
import AuthProvider from "@/context/AuthProvider";

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
  const { user, authInitialized } = useAuth();

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
  
  const onLayoutRootView = useCallback(async () => {
    if (authInitialized && user) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);


  if (!authInitialized && !user) return null;
  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
