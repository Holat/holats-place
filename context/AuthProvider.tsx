import { createContext, useState } from "react";
import * as userService from "../services/userService";
import { AxiosError } from "axios";
import {
  UserType,
  FormDetails,
  RegisterValues,
  ChangePassFormType,
  AuthContextType,
} from "@/constants/types";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType | null>(userService.getUser());
  const login = async (email: string, password: string) => {
    try {
      const user = await userService.login(email, password);
      setUser(user);
      console.log("Login Successful");
    } catch (error) {
      const err = error as AxiosError;
      console.log(typeof err.response?.data === "string" && err.response?.data);
    }
  };

  const register = async (data: RegisterValues) => {
    try {
      const user = await userService.register(data);
      setUser(user);
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

    type === "n"
      ? console.log("Logout Successful")
      : type === "t"
      ? console.log("Session expired")
      : null;
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
