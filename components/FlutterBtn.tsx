import { PayWithFlutterWave } from 'flutterwave-react-native';
import useCart from "@/hooks/useCart";
import { useRouter } from "expo-router";
import generateTransactionRef from '@/services/generateTransactionRef.ts'

interface RedirectParams {
    status: 'successful' | 'cancelled';
    transaction_id?: string;
    tx_ref: string;
}
// const [order, setOrder] = useState<OrderType>();

export default function PaymentBtn({ order }){
    const router = useRouter();
    const { clearCart } = useCart();
    
    const handleOnRedirect = ( data: RedirectParams ) => {
        if (data.status === "successful"){
            const paymentId = data.transaction_id;
            await pay(paymentId);
            clearCart();

            console.log("the payment was successful");
            router.push("/");
        } else{
            
            console.log("Payment Failed");
            router.push("/");
        }
    }
  
  return (
    <PayWithFlutterwave
      onRedirect={handleOnRedirect}
      options={{
        tx_ref: generateTransactionRef(10)
        authorization: 'FLWPUBK_TEST-da1d63d048b80ff95f0ce22da86fdd21-X',
        customer: {
          email: order.cart.?.email,
          phone_number: order.cart.?.phone,
          name: order.name,
        },
        amount: order.cart?.totalPrice,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
      }}
  />
  )
}
/**
* dependencies {
    If your app supports Android versions before Ice Cream Sandwich (API level 14)
  implementation 'com.facebook.fresco:animated-base-support:1.3.0'

   For animated GIF support
  implementation 'com.facebook.fresco:animated-gif:2.0.0'
}**/
