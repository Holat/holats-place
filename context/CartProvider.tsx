import { createContext, useEffect, useState } from "react";
import {
  FoodItemType,
  CartContextType,
  CartItemType,
  CartType,
} from "@/constants/types";

export const CartContext = createContext<CartContextType | null>(null);
const CART_KEY = "holatPlaceCart";
const EMPTY_CART: CartType = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const initCart = getLocalStorageCart();
  const [cartItems, setCartItems] = useState<CartItemType[]>(EMPTY_CART.items);
  const [totalPrice, setTotalPrice] = useState<number>(EMPTY_CART.totalPrice);
  const [totalCount, setTotalCount] = useState<number>(EMPTY_CART.totalCount);

  // function getLocalStorageCart() {
  //   const localCart = localStorage.getItem(CART_KEY);
  //   return localCart ? JSON.parse(localCart) : EMPTY_CART;
  // }

  const itemSum = (item: number[]) => item.reduce((prev, cur) => prev + cur, 0);

  useEffect(() => {
    const totalPrice = itemSum(
      cartItems.map((item: CartItemType) => item.price)
    );
    const totalCount = itemSum(
      cartItems.map((item: CartItemType) => item.quantity)
    );
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);

    // localStorage.setItem(
    //   CART_KEY,
    //   JSON.stringify({
    //     items: cartItems,
    //     totalPrice,
    //     totalCount,
    //   })
    // );
  }, [cartItems]);

  const removeFromCart = (foodId: number | string) => {
    const filterCartItem = cartItems.filter(
      (item: CartItemType) => item.food.id !== foodId
    );
    setCartItems(filterCartItem);
  };

  const changeQuantity = (cartItem: CartItemType, newQuantity: number) => {
    const { food } = cartItem;

    if (newQuantity < 1) {
      removeFromCart(food.id);
      return;
    }

    const changedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price * newQuantity,
    };

    setCartItems(
      cartItems.map((item: CartItemType) =>
        item.food.id === food.id ? changedCartItem : item
      )
    );
  };

  const addToCart = (food?: FoodItemType, quantity?: number | null) => {
    if (!food) {
      return;
    }

  // const cartItem = cartItems.find(
  //   (item: CartItemType) => item.food.id === food.id
  // );
    const cartItem = getCartItemById(food.id);
    if (cartItem) {
      changeQuantity(cartItem, cartItem.quantity + (quantity ? quantity : 1));
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food?.price }]);
    }
  };

  const getCartItemById = (id: string | number) => {
    const cartItem = cartItems.find((item: CartItemType) => {
      item.food.id === id
    });
    return cartItem;
  };

  const clearCart = () => {
    // localStorage.removeItem(CART_KEY);
    const { items, totalPrice, totalCount } = EMPTY_CART;
    setCartItems(items);
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);
  };

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
        clearCart,
        getCartItemById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
