import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Settings = () => {
  const showToast = () => {
    Toast.show({
      type: "success",
      text1: "Network Error",
      text2: "Please check your internet connection and try again.",
      // topOffset: hp(6),
    });
  };
  return (
    <SafeAreaView className="flex-1 px-4">
      <Button title="Show" onPress={showToast} />
    </SafeAreaView>
  );
};

export default Settings;
