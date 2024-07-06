import { PayWithFlutterwave, FlutterwaveInit } from "flutterwave-react-native";
import useCart from "@/hooks/useCart";
import { useRouter } from "expo-router";
import generateTransactionRef from "@/services/generateTransactionRef";
import { createOrder, pay } from "@/services/orderServices";
import { OrderType } from "@/constants/types";
import { View } from "react-native";

interface RedirectParams {
  status: "successful" | "cancelled";
  transaction_id?: string;
  tx_ref: string;
}

export default function PaymentBtn({ order }: { order: OrderType }) {
  const router = useRouter();
  const { clearCart } = useCart();

  const handleOnRedirect = async (data: RedirectParams) => {
    if (data.status === "successful") {
      const paymentId = data.transaction_id || Date();
      await pay(paymentId);
      clearCart();
      router.push("/(home)/(tabs)/");
    } else {
      console.log("Payment Failed");
      // router.push("/");
    }
  };

  const handlePaymentWillInit = () => {
    if (order.lat === 0 && order.lng === 0) {
      console.log("Location not set");
      return;
    }
  };

  const onPaymentInit = async () => {
    const data = await createOrder({ ...order });
    console.log(data);
  };

  return (
    <View>
      <PayWithFlutterwave
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
        }}
      />
    </View>
  );
}
