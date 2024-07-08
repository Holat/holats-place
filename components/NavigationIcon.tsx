import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const NavigationIcon = ({
  isFocused,
  label,
}: {
  isFocused: boolean;
  label: string;
}) => {
  var iconName = ((name: string) => {
    switch (name) {
      case "Home":
        return "appstore-o";
      case "Cart":
        return "shoppingcart";
      case "Search":
        return "search1";
      case "Profile":
        return "user";
      case "Favourites":
        return "hearto";
      default:
        return "appstore-o";
    }
  })(label);

  return (
    <View style={label === "Search" && styles.search}>
      <AntDesign
        name={iconName as any}
        color={
          isFocused && label !== "Search"
            ? "#FA6400"
            : label === "Search"
            ? "white"
            : "#959595"
        }
        size={26}
      />
    </View>
  );
};

export default NavigationIcon;

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#FA6400",
    borderRadius: 50,
    padding: 20,
  },
});
