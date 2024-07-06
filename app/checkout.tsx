import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { PaymentBtn } from "@/components";
import useCart from "@/hooks/useCart";
import { OrderType } from "@/constants/types";
// import useLocation from '@/hooks/useLocation';
import { Price } from "@/components";
import useAuth from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_API_GOOGLE_KEY || "";
const CheckOut = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<OrderType>({
    ...cart,
    name: user?.name,
    email: user?.email,
    address: user?.address,
    phonenumber: user?.phone,
    lat: 0,
    lng: 0,
  });
  //  const { location } = useLocation();

  const handleIsLoading = (b: boolean) => setIsLoading(b);

  const onAddressSelect = (details: GooglePlaceDetail | null) => {
    if (!details) return;
    const { formatted_address, geometry } = details;
    setOrder({
      ...order,
      address: formatted_address,
      lat: geometry.location.lat,
      lng: geometry.location.lng,
    });

    console.log(order);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 m-2">
        <View
          className="flex-1 bg-white rounded-3xl mb-2"
          style={{ padding: 16 }}
        >
          <View className="flex-1 pt-4">
            <DetailsD title={"Name"} text={order?.name} t />
            <DetailsD title={"Email"} text={order?.email} t />
            <View className="pl-2 mt-2">
              <Text className="font-bold text-sm ml-1 text-neutral-500 mb-2">
                Phone Number
                <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                placeholder="Phone Number"
                defaultValue={user?.phone}
                className="bg-neutral-100 py-2 px-4 rounded-xl border-neutral-300 border-[1px]"
              />
            </View>
            <View className="mt-2 ml-2">
              <Text className="font-bold text-sm ml-1 text-neutral-500 mb-2">
                Address
                <Text className="text-red-500">*</Text>
              </Text>
              <GooglePlacesAutocomplete
                query={{
                  key: GOOGLE_API_KEY,
                  language: "en",
                  components: "country:ng",
                }}
                placeholder="Search Delivery Address"
                fetchDetails={true}
                onPress={(_, details) => onAddressSelect(details)}
                styles={{
                  container: {
                    flex: 0,
                  },
                  textInput: {
                    borderWidth: 1,
                    borderRadius: 12,
                    backgroundColor: "#F5F5F5",
                    borderColor: "#D4D4D4",
                    paddingLeft: 16,
                  },
                  listView: {
                    backgroundColor: "#F5F5F5",
                    marginLeft: 8,
                    borderRadius: 12,
                  },
                  row: {
                    backgroundColor: "transparent",
                  },
                  separator: { backgroundColor: "white", height: 1 },
                }}
              />
            </View>
            <View className="pl-2 mt-3">
              <Text className="font-bold text-sm ml-1 text-neutral-500 mb-2">
                Nearest Bus Stop
              </Text>
              <TextInput
                placeholder={"Nearest Bus Stop"}
                className="bg-neutral-100 py-2 px-4 rounded-xl border-neutral-300 border-[1px]"
              />
            </View>
            <View className="pl-2 mt-3">
              <Text className="font-bold text-sm ml-1 text-neutral-500 mb-2">
                Zip/Postal Code
              </Text>
              <TextInput
                placeholder={"Zip/Postal Code"}
                className="bg-neutral-100 py-2 px-4 rounded-xl border-neutral-300 border-[1px]"
              />
            </View>
            {/* <View>
              <Text>Contact</Text>
              <Text>{}</Text>
            </View> */}
          </View>
        </View>
        <View className="rounded-3xl bg-white px-3 py-4 mb-2">
          <DetailsD title={"Sub total"} text={cart.totalPrice} />
          <DetailsD title={"Tax"} text={0} />
          <DetailsD title={"Delivery Fee"} text={1000} />
          <DetailsD title={"Grand Total"} text={cart.totalPrice + 1000} b />
        </View>
        <View>
          <PaymentBtn order={order} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const DetailsD = ({
  title,
  text,
  b,
  t,
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
          {t ? (
            <Text className="text-neutral-500 font-semibold">{text}</Text>
          ) : (
            <Price price={text as number} fontSize={18} />
          )}
        </View>
      </View>
      {!b && <View className="h-[1px] w-full bg-white self-center my-2" />}
    </>
  );
};
export default CheckOut;

const styles = StyleSheet.create({});
