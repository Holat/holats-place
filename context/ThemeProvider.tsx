import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "@/constants/Colors";
import { ThemeContextType, ThemeType, ThemeValueType } from "@/constants/types";
import { getValueFor, save } from "@/services/storage/asyncStorage";

export const ThemeContext = createContext<ThemeContextType | null>(null);

const USER_T = "HolatUserTheme";
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState<ThemeValueType>("dark");
  const [theme, setCTheme] = useState<ThemeType>(darkTheme);
  const sysTheme = useColorScheme() || "dark";

  useEffect(() => {
    (async () => {
      const val = await getValueFor(USER_T);
      if (val === "light" || val === "dark") {
        setValue(val);
        setCTheme(getTheme(val));
      }
    })();
  }, []);

  useEffect(() => {
    if (value === "default") {
      setCTheme(getTheme(sysTheme));
      setValue(sysTheme);
    }
  }, [sysTheme]);

  const getTheme = (b: string) => {
    return b === "dark" ? darkTheme : lightTheme;
  };

  const setTheme = async (b: ThemeValueType) => {
    let val = b;
    if (b === "default") val = sysTheme;

    setValue(val);
    const newTheme = getTheme(val);
    setCTheme(newTheme);
    await save(USER_T, val);
  };

  return (
    <ThemeContext.Provider
      value={{
        value,
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
