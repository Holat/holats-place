import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeProvider";
import { ThemeContextType } from "@/constants/types";

export default function useTheme() {
  return useContext(ThemeContext) as ThemeContextType;
}
