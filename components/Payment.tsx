import { PayWithFlutterWave } from 'flutterwave-react-native';
import { useRouter } from ''

interface RedirectParams {
    status: 'successful' | 'cancelled';
    transaction_id?: string;
    tx_ref: string;
}


export default function PaymentBtn(){
  const { user } = useAuth();
  const {} = useCart();
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
        authorization: '[merchant public key]',
        customer: {
          email: user?.email
        },
        amount: 2000,
        currency: 'NGN',
        payment_options: 'card'
      }}
  />
  )
}

// const handleOnSubmit = () => {
  
// }
/**
* dependencies {
  // If your app supports Android versions before Ice Cream Sandwich (API level 14)
  implementation 'com.facebook.fresco:animated-base-support:1.3.0'

  // For animated GIF support
  implementation 'com.facebook.fresco:animated-gif:2.0.0'
}
/
