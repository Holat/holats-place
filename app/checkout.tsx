import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { PaymentBtn } from "@/components";
import useCart from "@/hooks/useCart";
import { useRouter } from "expo-router";
import {OrderType} from '@/constants/types';
import useLocation from '@/hooks/useLocation';
import { Price } from "@/components";


const CheckOut = () => {
  const { cart } = useCart();
  const { user: {name, address, phonenumber, email} } = useAuth();
  const [userDetails, setUserDetails] = useState(
    {
      address,
      phonenumber
    }
  );
  const [order, setOrder] = useState({
    ...cart,
    ...userDetails,
    email,
    address,
    lat: 0,
    lng: 0,
  });
 const { location } = useLocation();


  const onSubmit = async () => {
    if (order.lat === 0 && order.lng === 0) {
      toast.warning("Please select your location on the map", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    l; 
    await createOrder({ ...order });
  };

  return (
    <SafeAreaView className='flex-1'>
     <View className='flex-1 m-2'>
        <ScrollView className='flex-1'>
          <View>
            <DetailsD title={'Name'} text={name} t/>
            <DetailsD title={'Email'} text={email} t/>
            <DetailsD title={'Contact'} text={phonenumber} t/>
            <DetailsD title={'Address'} text={address} t/>
            {/* <View>
              <Text>Contact</Text>
              <Text>{}</Text>
            </View> */}
          </View>
          <View className='rounded-3xl bg_white'>
            <DetailsD title={'Sub total'} text={cart.totalPrice} />
            <DetailsD title={'Tax'} text={0.00} />
            <DetailsD title={'Delivery Fee'} text={1000} />
            <DetailsD title={'Grand Total'} text={cart.totalPrice + 1000} />
          </View>
        </ScrollView>
        <View>
          <PaymentBtn order={order}/>
        </View>
     </View>
    </SafeAreaView>
  );
};


const DetailsD = ({
  title,
  text,
  b,
  t
}: {
  title: string;
  text?: string | number;
  b?: boolean;
  t?: boolean;
}) => {
  return (
    <>
      <View className="flex-row items-center justify-between px-2">
        <View>
          <Text className="font-bold text-base text-neutral-500">{title}</Text>
        </View>
        <View>
          {
            t ? <Text className="text-neutral-500 font-semibold">{text}</Text> :
            <Price price={text} fontSize={18} /> 
          }
        </View>
      </View>
      {b && <View className="h-[1px] w-full bg-neutral-200 self-center m-4" />}
    </>
  );
};


export default CheckOut;

const styles = StyleSheet.create({});
