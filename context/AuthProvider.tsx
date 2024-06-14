import { createContext, useEffect, useState } from "react";
import * as userService from "../services/userService";
import { AxiosError } from "axios";
import {
  UserType,
  FormDetails,
  RegisterValues,
  ChangePassFormType,
  AuthContextType,
  NewUserType,
} from "@/constants/types";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<NewUserType | null>(null);
  const getUser = async () => {
    const storageUser = await userService.getUser();
    storageUser ? setUser(storageUser) : setUser(null);
  };

  useEffect(() => {
    getUser();
  }, []);

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

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}
