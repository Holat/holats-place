import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import showToast from "@/services/ToastM";

const Settings = () => {
  return (
    <SafeAreaView className="flex-1 px-4">
      <Button title="Show" onPress={() => showToast("df")} />
    </SafeAreaView>
  );
};

export default Settings;
