import { createContext, useEffect, useState } from "react";
import * as userService from "@/services/userService";
import { useNavigationContainerRef, useRouter, useSegments } from "expo-router";
import * as favService from "@/services/favouriteServices";
import { AxiosError } from "axios";
import {
  UserType,
  FormDetails,
  RegisterValues,
  ChangePassFormType,
  AuthContextType,
} from "@/constants/types";
import showToast from "@/utils/ToastM";
import { getValueFor } from "@/utils/storage/asyncStorage";

export const AuthContext = createContext<AuthContextType | null>(null);
const USER = process.env.EXPO_PUBLIC_USER || "";
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const [authReady, setAuthReady] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [favFoods, setFavFoods] = useState<string[]>([]);

  const getUser = async () => {
    const userString = await getValueFor(USER || "");
    if (userString) {
      const data = JSON.parse(userString);
      setUser(data);
    }
    setAuthInitialized(true);
  };

  const loadFavorites = async () => {
    const storedFavorites = await favService.getFavoriteFoods();
    setFavFoods(storedFavorites);
  };

  const useProtectedRoute = (user: UserType | null) => {
    const [isNavigationReady, setIsNavigationIsReady] = useState(false);
    const rootNav = useNavigationContainerRef();
    const segments = useSegments();
    const router = useRouter();

    const authenticate = async () => {
      let success = false;
      if (!user) return success;
      user
        ? (success = await userService.authenticate(user?.email, user?.token))
        : (success = false);
      return success;
    };

    useEffect(() => {
      const unsub = rootNav?.addListener("state", (event) =>
        setIsNavigationIsReady(true)
      );

      return function cleanup() {
        if (unsub) unsub();
      };
    }, [rootNav]);

    useEffect(() => {
      (async () => {
        if (!isNavigationReady || isAuthenticated || !authInitialized) return;
        const inAuthGroup = segments[0] === "(auth)";
        const success = await authenticate();

        setIsAuthenticated(success);
        if (!success && !inAuthGroup) router.push("/(auth)/login");
        else if (success && inAuthGroup) router.push("/(home)/(tabs)/");

        if (success) await loadFavorites();
        setAuthReady(true);
      })();
    }, [user, segments, authInitialized, isNavigationReady]);
  };

  useEffect(() => {
    (async () => {
      await getUser();
    })();
  }, [authInitialized]);

  const toggleFavorite = async (foodId: string) => {
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

  const login = async (email: string, password: string) => {
    try {
      const data = await userService.login(email, password);
      setUser(data);
      showToast("Logged In", "Login Successful");
      return true;
    } catch (error) {
      const err = error as AxiosError;
      showToast(
        "Login Error",
        typeof err.response?.data === "string"
          ? err.response?.data
          : "Check you email and password"
      );
    }
    return false;
  };

  const register = async (data: RegisterValues) => {
    try {
      const apiData = await userService.register(data);
      setUser(apiData);
      showToast("", "Sign up successful!");
      return true;
    } catch (error) {
      showToast("", "Sign up Unsuccessful!");
    }
    return false;
  };

  /**
   * @param type "n" => normal logout | "t" => token exp logout
   */
  const logout = (type: "n" | "t") => {
    userService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setAuthInitialized(false);
    type === "n"
      ? console.log("Logout Successful")
      : type === "t"
      ? console.log("Session expired")
      : null;
  };

  const updateProfile = async (user: FormDetails) => {
    try {
      const updatedUser = await userService.updateProfile(user);
      showToast("Profile Updated");
      if (updatedUser) setUser(updatedUser);
      return true;
    } catch (error) {
      error instanceof Error
        ? showToast("Profile Update Error", error.message)
        : showToast("An Error occurred");
    }
    return false;
  };

  const changePassword = async (passwords: ChangePassFormType) => {
    try {
      await userService.changePassword(passwords);
      logout("n");
      showToast("Password Changed!");
      return true;
    } catch (error) {
      showToast("Error changing pass");
    }
    return false;
  };

  useProtectedRoute(user);
  return (
    <AuthContext.Provider
      value={{
        user,
        favFoods,
        authReady,
        authInitialized,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
        toggleFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
