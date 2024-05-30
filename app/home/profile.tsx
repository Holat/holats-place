import { View, Text } from "react-native";
import React from "react";
import useAuth from "@/hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();
  return (
    <View>
      <View>
        <Text>{user?.name}</Text>
        <Text>{user?.address}</Text>
        <Text>{user?.email}</Text>
        <Text>{user?.phone}</Text>
      </View>
    </View>
  );
}
