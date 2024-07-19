import { createContext, useEffect, useState } from "react";
import * as favService from "@/services/favouriteServices";
import {
  FoodItemType,
  CartContextType,
  CartItemType,
  CartType,
} from "@/constants/types";
import { save, deleteItem, getValueFor } from "@/utils/storage/asyncStorage";

export const CartContext = createContext<CartContextType | null>(null);
const CART_KEY = process.env.EXPO_PUBLIC_CART_KEY || "";
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
  const [cartItems, setCartItems] = useState<CartItemType[]>(EMPTY_CART.items);
  const [totalPrice, setTotalPrice] = useState<number>(EMPTY_CART.totalPrice);
  const [totalCount, setTotalCount] = useState<number>(EMPTY_CART.totalCount);
  const [favFoods, setFavFoods] = useState<(string | number)[]>([]);

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
    if (!food) return;

    const cartItem = getCartItemById(food.id);
    cartItem
      ? changeQuantity(cartItem, cartItem.quantity + (quantity ? quantity : 1))
      : setCartItems([...cartItems, { food, quantity: 1, price: food?.price }]);
  };

  const getCartItemById = (id: string | number) =>
    cartItems.find((item: CartItemType) => item.food.id === id);

  const clearCart = () => {
    deleteItem(CART_KEY);
    const { items, totalPrice, totalCount } = EMPTY_CART;
    setCartItems(items);
    setTotalPrice(totalPrice);
    setTotalCount(totalCount);
  };

  const toggleFavorite = async (foodId: string | number) => {
    let updatedFavorites;
    if (favFoods?.includes(foodId)) {
      updatedFavorites = favFoods.filter((id) => id !== foodId);
      setFavFoods(updatedFavorites);
      await favService.removeFavorite(foodId);
    } else {
      updatedFavorites = [...favFoods, foodId];
      setFavFoods(updatedFavorites);
      await favService.addFavourite(foodId);
    }
    await favService.setFavoriteFoods(updatedFavorites);
  };

  const clearFavourite = async () => {
    favService.clearFavorite();
  };

  const loadFavorites = async () => {
    const storedFavorites = await favService.getFavoriteFoods();
    setFavFoods(storedFavorites);
  };

  useEffect(() => {
    (async () => {
      const sCart = await getValueFor(CART_KEY);
      sCart && setCartItems(JSON.parse(sCart).items);

      await loadFavorites();
    })();
  }, []);

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

    save(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice,
        totalCount,
      })
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cart: { items: cartItems, totalPrice, totalCount },
        removeFromCart,
        changeQuantity,
        addToCart,
        clearCart,
        getCartItemById,
        favFoods,
        toggleFavorite,
        clearFavourite,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
