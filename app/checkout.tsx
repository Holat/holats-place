import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { OrderType } from "@/constants/types";
import { Price, PaymentBtn } from "@/components";
import { useAuth, useTheme, useCart } from "@/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
} from "react-native-google-places-autocomplete";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_API_GOOGLE_KEY || "";
const CheckOut = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const { theme, value } = useTheme();
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
  };
  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <SafeAreaView className="flex-1">
        {isLoading && (
          <View
            className="flex-1 absolute w-full h-full z-20 items-center justify-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
          >
            <ActivityIndicator color={"#FA6400"} size={35} />
          </View>
        )}
        <View className="flex-1 m-2">
          <View
            className="flex-1 rounded-3xl mb-2"
            style={{ padding: 16, backgroundColor: theme.bkg2 }}
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
                  style={{
                    color: theme.text,
                    backgroundColor: value === "dark" ? "#202020" : "#f5f5f5",
                  }}
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
                      color: theme.text,
                      borderWidth: 1,
                      borderRadius: 12,
                      backgroundColor: value === "dark" ? "#202020" : "#f5f5f5",
                      borderColor: "#D4D4D4",
                      paddingLeft: 16,
                    },
                    listView: {
                      backgroundColor: value === "dark" ? "#202020" : "#f5f5f5",
                      marginLeft: 8,
                      borderRadius: 12,
                    },
                    row: {
                      backgroundColor: "transparent",
                    },
                    separator: { backgroundColor: theme.bkg2, height: 1 },
                    description: { color: theme.text },
                  }}
                />
              </View>
              <View className="pl-2 mt-3">
                <Text className="font-bold text-sm ml-1 text-neutral-500 mb-2">
                  Nearest Bus Stop
                </Text>
                <TextInput
                  style={{
                    color: theme.text,
                    backgroundColor: value === "dark" ? "#202020" : "#f5f5f5",
                  }}
                  placeholder={"Nearest Bus Stop"}
                  className="bg-neutral-100 py-2 px-4 rounded-xl border-neutral-300 border-[1px]"
                />
              </View>
              <View className="pl-2 mt-3">
                <Text className="font-bold text-sm ml-1 text-neutral-500 mb-2">
                  Zip/Postal Code
                </Text>
                <TextInput
                  style={{
                    color: theme.text,
                    backgroundColor: value === "dark" ? "#202020" : "#f5f5f5",
                  }}
                  placeholder={"Zip/Postal Code"}
                  className="py-2 px-4 rounded-xl border-neutral-300 border-[1px]"
                />
              </View>
            </View>
          </View>
          <View
            className="rounded-3xl bg-white px-3 py-4 mb-2"
            style={{ backgroundColor: theme.bkg2 }}
          >
            <DetailsD title={"Sub total"} text={cart.totalPrice} />
            <DetailsD title={"Tax"} text={0} />
            <DetailsD title={"Delivery Fee"} text={1000} />
            <DetailsD title={"Grand Total"} text={cart.totalPrice + 1000} b />
          </View>
          <View>
            <PaymentBtn order={order} handleIsLoading={handleIsLoading} />
          </View>
        </View>
      </SafeAreaView>
    </View>
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
  const { theme } = useTheme();
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
            <Price price={text as number} fontSize={18} color={theme.text} />
          )}
        </View>
      </View>
      {!b && (
        <View
          className="h-[1px] w-full self-center my-2"
          style={{ backgroundColor: theme.bkg2 }}
        />
      )}
    </>
  );
};
export default CheckOut;

const styles = StyleSheet.create({});
