import { Tabs } from "expo-router";
import React from "react";
import CustomTabs from "@/components/CustomTabs";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "orange",
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <CustomTabs {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          // headerShown: true,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
