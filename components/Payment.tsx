import { PayWithFlutterWave } from 'flutterwave-react-native';
import useCart from "@/hooks/useCart";
import { useRouter } from "expo-router";

interface RedirectParams {
    status: 'successful' | 'cancelled';
    transaction_id?: string;
    tx_ref: string;
}


export default function PaymentBtn(){
    const { user } = useAuth();
    const {
        cart: { items, totalPrice },
    } = useCart();
    const router = useRouter();
    
    const handleOnRedirect = ( data: RedirectParams ) => {
        if (data.status === "successful"){
            router.push("/");
        } else{
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
          email: user?.email
        },
        amount: totalPrice,
        currency: 'NGN',
        payment_options: 'card'
      }}
  />
  )
}
/**
* dependencies {
  // If your app supports Android versions before Ice Cream Sandwich (API level 14)
  implementation 'com.facebook.fresco:animated-base-support:1.3.0'

  // For animated GIF support
  implementation 'com.facebook.fresco:animated-gif:2.0.0'
}
/
