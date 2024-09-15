import { View } from "react-native";
import { PayWithFlutterwave } from "flutterwave-react-native";
import { useCart } from "@/hooks";
import { useRouter } from "expo-router";
import generateTransactionRef from "@/utils/generateTransactionRef";
import { createOrder, pay } from "@/services/orderServices";
import { OrderType } from "@/constants/types";
import showToast from "@/utils/ToastM";

interface RedirectParams {
  status: "successful" | "cancelled";
  transaction_id?: string;
  tx_ref: string;
}

export default function PaymentBtn({
  order,
  handleIsLoading,
}: {
  order: OrderType;
  handleIsLoading: (b: boolean) => void;
}) {
  const router = useRouter();
  const { clearCart } = useCart();
  const tx_ref = generateTransactionRef(10) || "";
  const postOrder = { ...order, tx_ref };

  const handleOnRedirect = async (data: RedirectParams) => {
    handleIsLoading(true);
    if (data.status === "successful") {
      const paymentId = data.transaction_id || Date();
      await pay(paymentId, tx_ref);
      clearCart();
      handleIsLoading(false);
      router.push("/(home)/orders");
    } else {
      handleIsLoading(false);
      router.push("/cart");
    }
  };

  const handlePaymentWillInit = () => {
    if (postOrder.lat === 0 && postOrder.lng === 0) {
      showToast("Select Location!", "Delivery location has to be specified");
      return;
    }
  };

  const onPaymentInit = async () => {
    try {
      await createOrder(postOrder);
    } catch (error) {
      showToast("Error Placing Order");
      return;
    }
  };

  return (
    <View>
      <PayWithFlutterwave
        style={{ backgroundColor: "#FA6400", borderRadius: 16 }}
        onRedirect={handleOnRedirect}
        onWillInitialize={() => handlePaymentWillInit()}
        onDidInitialize={() => onPaymentInit()}
        onInitializeError={() =>
          showToast("Network Error", "Please check the internet connection")
        }
        options={{
          tx_ref: postOrder.tx_ref,
          authorization: process.env.EXPO_PUBLIC_API_FLUTTER_KEY || "",
          customer: {
            email: postOrder.email || "",
            phonenumber: postOrder.phonenumber,
            name: postOrder.name,
          },
          amount: postOrder.totalPrice || 0,
          currency: "NGN",
          payment_options: "card,ussd,banktransfer",
          // customizations: {
          //   title: "Holat's Place",
          //   logo: "../assets/images/icon.png",
          // },
        }}
      />
    </View>
  );
}
