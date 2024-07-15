import Toast from "react-native-toast-message";

export default function showToast(text1?: string, text2?: string) {
  Toast.show({ type: "success", text1, text2 });
}
