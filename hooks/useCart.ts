import { useContext } from "react";
import { CartContext } from "@/context/CartProvider";
import { CartContextType } from "@/constants/types";

export default function useCart() {
  return useContext(CartContext) as CartContextType;
}
