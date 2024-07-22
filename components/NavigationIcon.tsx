import { View } from "react-native";
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
    <View>
      <AntDesign
        name={iconName as any}
        color={isFocused ? "#FA6400" : "#959595"}
        size={26}
      />
    </View>
  );
};
export default NavigationIcon;
// change tab ui
// <View style={label === "Search" && styles.search}>
//  isFocused && label !== "Search"
//    ? "#FA6400"
//    : label === "Search"
//    ? "white"
//    : "#959595";

// const styles = StyleSheet.create({
//   search: {
//     backgroundColor: "#FA6400",
//     borderRadius: 50,
//     padding: 20,
//   },
// });
