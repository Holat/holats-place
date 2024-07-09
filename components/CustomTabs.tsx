import { StyleSheet, View, Pressable } from "react-native";
import React from "react";
import NavigationIcon from "./NavigationIcon";
import { useTheme } from "@/hooks";

const CustomTabs = ({ state, descriptors, navigation }: any) => {
  return (
    <View
      style={styles.shadow}
      className="bottom-0 w-full self-center bg-white pt-2 pb-4 absolute flex-row rounded-t-3xl"
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            key={index}
            className="flex-1 flex-row justify-center items-center"
          >
            <Pressable onPress={onPress}>
              <NavigationIcon isFocused={isFocused} label={label} />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

export default CustomTabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
