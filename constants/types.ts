import { AnimatedStyle } from "react-native-reanimated";
import { Control, FieldError } from "react-hook-form";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";

export type FoodItemType = {
  id: number | string;
  name: string;
  cookTime: number | string;
  price: number;
  favorite: boolean;
  origins: string[];
  stars: number;
  imageUrl: string;
  tags: string[];
  desc?: string;
};

export interface TagTypes {
  name: string;
  // count: number;
}

export type FoodType = {
  foods: FoodItemType[];
  tags: TagTypes[];
};

export type IAction =
  | { type: "FOODS_LOADED"; payload: FoodItemType[] }
  | { type: "TAGS_LOADED"; payload: TagTypes[] };

export interface CartFoodType {
  _id?: number | string;
  id: number | string;
  name: string;
  price: number;
  imageUrl: string;
}

export type CartItemType = {
  food: CartFoodType;
  quantity: number;
  price: number;
};

export type CartType = {
  items: CartItemType[];
  totalPrice: number;
  totalCount: number;
};

export type CartContextType = {
  cart: CartType;
  removeFromCart: (foodId: number | string) => void;
  changeQuantity: (cartItem: CartItemType, newQuantity: number) => void;
  addToCart: (food?: FoodItemType, quantity?: number | null) => void;
  clearCart: () => void;
  getCartItemById: (id: string | number) => CartItemType | undefined;
  toggleFavorite: (d: string | number) => void;
  clearFavourite: () => void;
  favFoods: (string | number)[];
};

export type NewUserType = {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
};

export type UserType = NewUserType & {
  id: string | number;
  token: string;
  favourites?: [string] | null;
};

export type RegisterValues = {
  name: string;
  email: string;
  mobileNumber: string;
  address: string;
  password: string;
  confirmPassword: string;
};

export type ChangePassFormType = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export interface FormDetails {
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
}

export type AuthContextType = {
  user: NewUserType | null;
  authInitialized: boolean;
  authReady: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (user: RegisterValues) => Promise<boolean>;
  logout: (type: "n" | "t") => void;
  updateProfile: (user: FormDetails) => Promise<boolean>;
  changePassword: (passwords: ChangePassFormType) => Promise<boolean>;
};

export type OrderType = {
  name?: string;
  address?: string;
  lat?: number | string;
  lng?: number | string;
  email?: string;
  phonenumber?: string;
} & CartType;

export type ThemeType = {
  text: string;
  background: string;
  bkg2: string;
  accent: string;
  accentV: string;
  payed: string;
  new: string;
  failed: string;
};

export type OrderHistoryType = {
  id: string;
  address: string;
  totalPrice: number;
  totalCount: number;
  createdAt: string;
  status: string;
  items: CartItemType[];
};

export type PriceCompType = {
  locale?: string;
  price: number;
  currency?: string;
  showP?: boolean;
  fontSize?: number;
  color?: string;
};

type RegisterValuesKeys = keyof RegisterValues;

export type ControlledInputType = {
  isLoading: boolean;
  name: RegisterValuesKeys;
  error: FieldError | undefined;
  control: Control<RegisterValues, any>;
  label: string;
  p?: boolean;
};

export type CPControlledIn = {
  isLoading: boolean;
  control: Control<ChangePassFormType, any>;
  error: FieldError | undefined;
  name: keyof ChangePassFormType;
  title: string;
};

export type ThemeValueType = "light" | "dark" | "default";

export type ThemeContextType = {
  value: ThemeValueType;
  theme: ThemeType;
  cTheme: "dark" | "light";
  setTheme: (b: "light" | "dark" | "default") => void;
  rStyle: AnimatedStyle;
  rBkg2Style: AnimatedStyle;
  rTextStyle: AnimatedStyle;
};

export type GooglePlacesInputType = {
  onAddressSelect: (details: GooglePlaceDetail | null) => void;
  theme: ThemeType;
  value?: string | null;
};

export type FoodCardType = {
  item: FoodItemType;
  handleAddToCart: (item: FoodItemType) => void;
  rBkg2Style: AnimatedStyle;
  rTextStyle: AnimatedStyle;
  color: string[];
};

export type FoodCardItemType = {
  item: FoodItemType;
  addToCart: (food?: FoodItemType) => void;
  rBkg2Style: AnimatedStyle;
  rTextStyle: AnimatedStyle;
  color: string;
};

export type CartCardType = {
  item: CartItemType;
  removeFromCart: (id: string | number) => void;
  rTextStyle: AnimatedStyle;
  color: string;
};

export type OrderCardType = {
  item: OrderHistoryType;
  theme: ThemeType;
  rBkg2Style: AnimatedStyle;
  rTextStyle: AnimatedStyle;
};

export type FavFoodCardType = {
  item: FoodItemType;
  handleAddToCart: (item: FoodItemType) => void;
  value: string;
  handleFav: (foodId: string | number) => void;
};
