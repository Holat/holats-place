import { createContext, useEffect, useState } from "react";
import * as userService from "../services/userService";
import { AxiosError } from "axios";
import {
  UserType,
  FormDetails,
  RegisterValues,
  ChangePassFormType,
  AuthContextType,
} from "@/constants/types";
import showToast from "@/services/ToastM";
import { useNavigationContainerRef, useRouter, useSegments } from "expo-router";
import { getValueFor } from "@/services/storage/asyncStorage";

export const AuthContext = createContext<AuthContextType | null>(null);

const USER = process.env.EXPO_PUBLIC_USER;
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const getUser = async () => {
    const userString = await getValueFor(USER || "");
    if (userString) {
      const data = JSON.parse(userString);
      setUser(data);
    }
    setAuthInitialized(true);
  };

  const useProtectedRoute = (user: UserType | null) => {
    const [isNavigationReady, setIsNavigationIsReady] = useState(false);
    const rootNav = useNavigationContainerRef();
    const segments = useSegments();
    const router = useRouter();

    // const authenticate = async () => {
    //   let success = false;
    //   user
    //     ? (success = await userService.authenticate(user?.email, user?.token))
    //     : (success = false);
    //   return success;
    // };

    const authenticate = async () => {
      if (user) return true;
      else return false;
    };

    useEffect(() => {
      const unsub = rootNav?.addListener("state", (event) => {
        setIsNavigationIsReady(true);
      });

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

        // console.log(inAuthGroup, success);

        if (!success && !inAuthGroup) router.push("/(auth)/login2");
        else if (success && inAuthGroup) router.push("/(home)/(tabs)/");
      })();
    }, [user, segments, authInitialized, isNavigationReady]);
  };

  useEffect(() => {
    getUser();
  }, [isAuthenticated]);

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
    } catch (error) {
      console.log("Unsuccessful");
    }
  };

  /**
   *
   * @param type "n" => normal logout | "t" => token exp logout
   */
  const logout = (type: "n" | "t") => {
    userService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setAuthInitialized(false);
    console.log("Logout Successful");
    // type === "n"
    //   ? console.log("Logout Successful")
    //   : type === "t"
    //   ? console.log("Session expired")
    //   : null;
  };

  const updateProfile = async (user: FormDetails) => {
    try {
      const updatedUser = await userService.updateProfile(user);
      console.log("Profile Updated");
      if (updatedUser) setUser(updatedUser);
    } catch (error) {
      error instanceof Error
        ? console.log(error.message)
        : console.log("An Error occurred");
    }
  };

  const changePassword = async (passwords: ChangePassFormType) => {
    await userService.changePassword(passwords);
    logout("n");
    console.log("Password Changed!");
  };

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        authInitialized,
        login,
        register,
        logout,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
