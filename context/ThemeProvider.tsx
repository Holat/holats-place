// @ts-nocheck
import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "@/constants/Colors";
import { ThemeContextType, ThemeType, ThemeValueType } from "@/constants/types";
import { getValueFor, save } from "@/utils/storage/asyncStorage";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";

export const ThemeContext = createContext<ThemeContextType | null>(null);

const USER_T = "HolatUserTheme";
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState<ThemeValueType>("dark");
  const [cTheme, setCTheme] = useState<"light" | "dark">("dark");
  const [theme, setAppTheme] = useState<ThemeType>(darkTheme);
  const sysTheme = useColorScheme() || "dark";

  const getTheme = (b: string) => {
    return b === "dark" ? darkTheme : lightTheme;
  };

  // const progress = useSharedValue(0);
  const progress = useDerivedValue(() => {
    const themeValue = value === "default" ? sysTheme : value;
    return themeValue === "dark" ? withTiming(1) : withTiming(0);
  }, [theme, sysTheme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [lightTheme.background, darkTheme.background]
    );
    return { backgroundColor };
  });

  const rBkg2Style = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [lightTheme.bkg2, darkTheme.bkg2]
    );
    return { backgroundColor };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [lightTheme.text, darkTheme.text]
    );
    return { color };
  });

  useEffect(() => {
    (async () => {
      const val = await getValueFor(USER_T);
      const themeValue = val === "default" ? sysTheme : val;
      if (themeValue && val) {
        setValue(val);
        setCTheme(themeValue);
        setAppTheme(getTheme(val));
      }
    })();
  }, []);

  useEffect(() => {
    if (value !== "default") return;
    setAppTheme(getTheme(sysTheme));
    setCTheme(sysTheme);
  }, [sysTheme]);

  const setTheme = async (b: ThemeValueType) => {
    let val = b;
    if (b === "default") val = sysTheme;

    setValue(b);
    setCTheme(val);
    const newTheme = getTheme(val);
    setAppTheme(newTheme);
    await save(USER_T, b);
  };

  return (
    <ThemeContext.Provider
      value={{
        value,
        cTheme,
        theme,
        setTheme,
        rStyle,
        rBkg2Style,
        rTextStyle,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
