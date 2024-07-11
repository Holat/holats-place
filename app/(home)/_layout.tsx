import "react-native-gesture-handler";
import React from "react";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer";
import { useAuth, useTheme } from "@/hooks";

export default function _layout() {
  const { user, logout } = useAuth();
  const { theme, value } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: theme.accentV,
        drawerActiveTintColor: "black",
        drawerItemStyle: {
          width: "100%",
          marginHorizontal: 0,
          paddingHorizontal: 4,
          borderRadius: 0,
        },
        drawerLabelStyle: {
          fontSize: 16,
          color: theme.text,
        },
        drawerStyle: {
          backgroundColor: theme.background,
        },
      }}
      drawerContent={(props) => (
        <CustomDrawer {...props} user={user} logout={logout} tValue={value} />
      )}
    >
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home" }} />
      <Drawer.Screen name="profile" options={{ drawerLabel: "Profile" }} />
      <Drawer.Screen name="orders" options={{ drawerLabel: "Orders" }} />
    </Drawer>
  );
}
