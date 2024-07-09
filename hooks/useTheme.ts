import { useContext } from "react";
import { ThemeContext } from "@/context/CartProvider";
import { ThemeContextType } from "@/constants/types";

export default function useTheme() {
  return useContext(ThemeContext) as ThemeContextType;
}
