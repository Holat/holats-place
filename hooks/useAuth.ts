import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { AuthContextType } from "@/constants/types";

// export default function useAuth() {
//   return useContext(AuthContext) as AuthContextType;
// }
export default function useAuth() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return authContext;
}
