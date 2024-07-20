import { Tabs } from "expo-router";
import CustomTabs from "@/components/CustomTabs";
import { useCart, useTheme } from "@/hooks";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
  const { rBkg2Style, rTextStyle } = useTheme();
  const {
    cart: { totalCount },
  } = useCart();
  const { top } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "orange",
        tabBarHideOnKeyboard: true,
      }}
      tabBar={(props) => <CustomTabs {...props} count={totalCount} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: "Favourites",
          headerShown: true,
          header: (props) => (
            <Animated.View
              style={[rBkg2Style, { paddingTop: top + 2 }]}
              className="px-3 pb-2"
            >
              <Animated.Text
                style={rTextStyle}
                className={"font-bold text-xl capitalize m-2"}
              >
                {props.route.name}
              </Animated.Text>
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          header: (props) => (
            <Animated.View
              style={[rBkg2Style, { paddingTop: top + 2 }]}
              className="px-3 pb-2"
            >
              <Animated.Text
                style={rTextStyle}
                className={"font-bold text-xl capitalize m-2"}
              >
                {props.route.name}
              </Animated.Text>
            </Animated.View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
