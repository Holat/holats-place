import "react-native-gesture-handler";

import { View, Text } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import FA6 from "react-native-vector-icons/FontAwesome6";
import CustomDrawer from "@/components/CustomDrawer";
import { StatusBar } from "expo-status-bar";

// <FA6 name="bars-staggered" color={color}></FA6>

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
