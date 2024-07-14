import "react-native-gesture-handler";
import React from "react";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer";
import { useAuth, useTheme } from "@/hooks";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function _layout() {
  const { user, logout } = useAuth();
  const { theme, value } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: theme.accentV,
        drawerActiveTintColor: theme.text,
        drawerInactiveTintColor: "#959595",
        drawerItemStyle: {
          width: "100%",
          marginHorizontal: 0,
          paddingHorizontal: 16,
          borderRadius: 0,
        },
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: 8,
        },
        drawerStyle: {
          backgroundColor: theme.background,
        },
      }}
      drawerContent={(props) => (
        <CustomDrawer {...props} user={user} logout={logout} tValue={value} />
      )}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color }) => (
            <View style={{ marginRight: -28 }}>
              <AntDesign name="home" size={22} color={color} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="orders"
        options={{
          drawerLabel: "Orders",
          drawerIcon: ({ color }) => (
            <View style={{ marginRight: -28 }}>
              <Octicons name="history" size={22} color={color} />
            </View>
          ),
        }}
      />
    </Drawer>
  );
}
