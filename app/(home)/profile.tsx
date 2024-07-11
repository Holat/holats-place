import { View, Text } from "react-native";
import React from "react";
import useAuth from "@/hooks/useAuth";
import { HomeCardLoading } from "@/components";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView
      style={{ backgroundColor: "#121212", flex: 1, padding: 16 }}
    ></SafeAreaView>
  );
}
