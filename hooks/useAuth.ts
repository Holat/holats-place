import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { AuthContextType } from "@/constants/types";

export default function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}
