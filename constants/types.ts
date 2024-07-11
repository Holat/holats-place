import { AnimatedStyleProp } from "react-native-reanimated";

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

export interface ChangePassFormType {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

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
  favFoods: string[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (user: RegisterValues) => void;
  logout: (type: "n" | "t") => void;
  updateProfile: (user: FormDetails) => void;
  changePassword: (passwords: ChangePassFormType) => void;
  toggleFavorite: (d: string) => void;
};

export type OrderType = {
  name?: string;
  address?: string;
  lat: number;
  lng: number;
  email?: string;
  phonenumber?: string;
} & CartType;

export type ThemeType = {
  text: string;
  background: string;
  bkg2: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  accent: string;
  accentV: string;
  payed: string;
  new: string;
  failed: string;
};

export type OrderHistoryType = {
  _id: string;
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

export type ThemeValueType = "light" | "dark" | "default";

export type ThemeContextType = {
  value: ThemeValueType;
  theme: ThemeType;
  setTheme: (b: "light" | "dark" | "default") => void;
  rStyle: AnimatedStyleProp;
  rBkg2Style: AnimatedStyleProp;
  rTextStyle: AnimatedStyleProp;
};

export type FoodCardType = {
  item: FoodItemType;
  handleAddToCart: (item: FoodItemType) => void;
  rBkg2Style: AnimatedStyleProp;
  rTextStyle: AnimatedStyleProp;
};

export type FoodCardItemType = {
  item: FoodItemType;
  addToCart: (food?: FoodItemType) => void;
  rBkg2Style: AnimatedStyleProp;
  rTextStyle: AnimatedStyleProp;
};

export type CartCardType = {
  item: CartItemType;
  removeFromCart: (id: string | number) => void;
  rTextStyle: AnimatedStyleProp;
};

export type OrderCardType = {
  item: OrderHistoryType;
  theme: ThemeType;
  rBkg2Style: AnimatedStyleProp;
  rTextStyle: AnimatedStyleProp;
};
