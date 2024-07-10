import { View, Text, Image } from "react-native";
import React from "react";
import { useAuth, useTheme } from "@/hooks";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profile() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { bottom, top } = useSafeAreaInsets();

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          padding: 8,
        }}
        style={{ marginBottom: 100 }}
      >
        <View
          style={{ backgroundColor: theme.bkg2 }}
          className="p-4 w-full rounded-2xl"
        >
          <View className="items-center">
            <View className="w-20 h-20 mb-2">
              <Image
                source={require("@/assets/images/avatar.jpeg")}
                className="rounded-full w-full h-full"
              />
            </View>
            <Text className="text-xl font-bold " style={{ color: theme.text }}>
              {user?.name}
            </Text>
            <Text className="text-neutral-600">{user?.email}</Text>
          </View>
        </View>
        <View
          className="mt-2 w-full rounded-2xl py-4 px-2"
          style={{ backgroundColor: theme.bkg2 }}
        >
          <DetailsD title="Name" text={user?.name} b />
          <DetailsD title="Email" text={user?.email} b />
          <DetailsD title="Contact" text={user?.phone} b />
          <DetailsD title="Address" text={user?.address} />
        </View>
        <View
          className="flex-1 rounded-2xl mt-2 py-4 px-4 w-full"
          style={{ backgroundColor: theme.bkg2 }}
        >
          <View>
            <Text className="text-red-600 font-semibold text-base">Logout</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const DetailsD = ({
  title,
  text,
  b,
}: {
  title: string;
  text?: string;
  b?: boolean;
}) => {
  return (
    <>
      <View className="flex-row items-center justify-between px-2">
        <View>
          <Text className="font-bold text-base text-neutral-700">{title}</Text>
        </View>
        <View>
          <Text className="text-neutral-500 font-semibold">{text}</Text>
        </View>
      </View>
      {b && (
        <View className="h-[1px] w-full bg-white opacity-5 self-center m-4" />
      )}
    </>
  );
};
