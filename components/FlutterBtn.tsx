import { PayWithFlutterwave } from "flutterwave-react-native";
import useCart from "@/hooks/useCart";
import { useRouter } from "expo-router";
import generateTransactionRef from "@/services/generateTransactionRef";
import { pay } from "@/services/orderServices";
import { OrderType } from "@/constants/types";
import { View } from "react-native";

interface RedirectParams {
  status: "successful" | "cancelled";
  transaction_id?: string;
  tx_ref: string;
}
// const [order, setOrder] = useState<OrderType>();

export default function PaymentBtn({ order }: { order: OrderType }) {
  const router = useRouter();
  const { clearCart } = useCart();

  const handleOnRedirect = async (data: RedirectParams) => {
    if (data.status === "successful") {
      const paymentId = data.transaction_id || Date();
      await pay(paymentId);
      clearCart();

      console.log("the payment was successful");
      router.push("/");
    } else {
      console.log("Payment Failed");
      // router.push("/");
    }
  };

  return (
    <View>
      <PayWithFlutterwave
        onRedirect={handleOnRedirect}
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
/**
* dependencies {
    If your app supports Android versions before Ice Cream Sandwich (API level 14)
  implementation 'com.facebook.fresco:animated-base-support:1.3.0'

   For animated GIF support
  implementation 'com.facebook.fresco:animated-gif:2.0.0'
}**/
