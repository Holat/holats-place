import "react-native-gesture-handler";
import React from "react";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer";
import useAuth from "@/hooks/useAuth";

export default function _layout() {
  const { user, logout } = useAuth();
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#fed7aa",
        drawerActiveTintColor: "black",
        drawerItemStyle: {
          width: "100%",
          marginHorizontal: 0,
          paddingHorizontal: 4,
          borderRadius: 0,
        },
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
      drawerContent={(props) => (
        <CustomDrawer {...props} user={user} logout={logout} />
      )}
    >
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home" }} />
      <Drawer.Screen name="profile" options={{ drawerLabel: "Profile" }} />
      <Drawer.Screen name="orders" options={{ drawerLabel: "Order History" }} />
    </Drawer>
  );
}
