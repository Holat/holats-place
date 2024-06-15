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
import Toast from "react-native-toast-message";
import {
  router,
  useNavigationContainerRef,
  useRouter,
  useSegments,
} from "expo-router";
import { getValueFor } from "@/services/storage/asyncStorage";

export const AuthContext = createContext<AuthContextType | null>(null);

const USER = "holatPlaceUser";
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const [auth, setAuth] = useState(false);

  const getUser = async () => {
    const userString = await getValueFor(USER);
    if (userString) {
      const data = JSON.parse(userString);
      setUser(data);
    }

    setAuthInitialized(true);
    console.log("initialize ", user);
  };

  useEffect(() => {
    getUser();
  }, []);

  const useProtectedRoute = (user: UserType | null) => {
    const segments = useSegments();
    const router = useRouter();

    const [isNavigationReady, setIsNavigationIsReady] = useState(false);
    const rootNav = useNavigationContainerRef();

    useEffect(() => {
      const unsub = rootNav?.addListener("state", (event) => {
        setIsNavigationIsReady(true);
      });

      return function cleanup() {
        if (unsub) {
          unsub();
        }
      };
    }, [rootNav]);

    useEffect(() => {
      if (!isNavigationReady) {
        return;
      }

      const inAuthGroup = segments[0] === "(auth)";

      if (!authInitialized) return;

      if (
        // If the user is not signed in and the initial segment is not anything in the auth group.
        !user &&
        !inAuthGroup
      ) {
        // Redirect to the sign-in page.
        router.push("/(auth)/login2");
        console.log("login");
      } else if (user && inAuthGroup) {
        // Redirect away from the sign-in page.
        router.push("/(home)/(tabs)/");
        console.log("home page");
      }
    }, [user, segments, authInitialized, isNavigationReady]);
  };
  // const authenticate = async(email: string, password: string) {}

  const showToast = (type: string, text1: string, text2: string) =>
    Toast.show({ type, text1, text2 });

  const login = async (email: string, password: string) => {
    try {
      const data = await userService.login(email, password);
      setUser(data);
      showToast("success", "Logged In", "Login Successful");
      return true;
    } catch (error) {
      const err = error as AxiosError;
      showToast(
        "error",
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
      console.log("Sign up successful!");
    } catch (error) {
      console.log("Unsuccessful");
    }
  };

  /**
   *
   * @param type n: normal logout | t: token exp logout
   */
  const logout = (type: "n" | "t") => {
    userService.logout();
    setUser(null);
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
