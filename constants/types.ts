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
  addToCart: (food?: FoodItemType) => void;
  clearCart: () => void;
  getCartItemById: (id: string | number) => CartItemType;
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
};

export type RegisterValues = {
  firstName: string;
  lastName: string;
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
  user: UserType | null;
  login: (email: string, password: string) => void;
  register: (user: RegisterValues) => void;
  logout: (type: "n" | "t") => void;
  updateProfile: (user: FormDetails) => void;
  changePassword: (passwords: ChangePassFormType) => void;
};

export type OrderType = {
  name?: string;
  address?: string;
  lat: number;
  lng: number;
  status?: string;
} & CartType;
