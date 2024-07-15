import { PayWithFlutterwave } from "flutterwave-react-native";
import { useCart } from "@/hooks";
import { useRouter } from "expo-router";
import generateTransactionRef from "@/utils/generateTransactionRef";
import { createOrder, pay } from "@/services/orderServices";
import { OrderType } from "@/constants/types";
import { View } from "react-native";

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

  const handleOnRedirect = async (data: RedirectParams) => {
    handleIsLoading(true);
    if (data.status === "successful") {
      const paymentId = data.transaction_id || Date();
      await pay(paymentId);
      clearCart();
      handleIsLoading(false);
      router.push("/(home)/orders");
    } else {
      handleIsLoading(false);
      router.push("/cart");
    }
  };

  const handlePaymentWillInit = () => {
    if (order.lat === 0 && order.lng === 0) {
      console.log("Location not set");
      return;
    }
  };

  const onPaymentInit = async () => {
    console.log("clicked");
    const data = await createOrder({ ...order });
    console.log(data);
  };

  return (
    <View>
      <PayWithFlutterwave
        style={{ backgroundColor: "#FA6400", borderRadius: 16 }}
        onRedirect={handleOnRedirect}
        onWillInitialize={() => handlePaymentWillInit()}
        onDidInitialize={() => onPaymentInit()}
        options={{
          tx_ref: generateTransactionRef(10),
          authorization: process.env.EXPO_PUBLIC_API_FLUTTER_KEY || "",
          customer: {
            email: order.email || "",
            phonenumber: order.phonenumber,
            name: order.name,
          },
          amount: order.totalPrice,
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
