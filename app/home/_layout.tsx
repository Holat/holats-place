import "react-native-gesture-handler";
import React from "react";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer";

export default function _layout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#FA640080",
      }}
      drawerContent={CustomDrawer}
    ></Drawer>
  );
}
