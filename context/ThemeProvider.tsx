import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { lightTheme, darkTheme } from "../constants/Colors.ts";
import { ThemeContextType, ThemeType } from "@/constants/types";
import { getValueFor, save } from "./storage/asyncStorage";

export const ThemeContext = createContext<ThemeContextType>();

const USER_T = "HolatUserTheme";
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = useState("light");
  const [theme, setTheme] = useState<ThemeType>(lightTheme);
  const sysTheme = useColorScheme();

  useEffect(() => {
    (async () => {
      const val = await getValueFor(USER_T);
      val && setValue(val);
    })();
  }, []);

  useEffect(() => {
    if (value === "default") {
      setTheme(getTheme(sysTheme));
    }
  }, [sysTheme]);

  const getTheme = (b: string) => {
    return b === "dark" ? darkTheme : lightTheme;
  };

  const setTheme = async (b: "light" | "dark" | "default") => {
    let val = b;
    if (b === "default") val = sysTheme;

    setValue(val);
    const newTheme = getTheme(val);
    setTheme(newTheme);
    await save(USER_T, val);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
