import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { OrderType } from "@/constants/types";
import { Price, PaymentBtn } from "@/components";
import { useAuth, useTheme, useCart } from "@/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import GooglePlacesInput from "@/components/GooglePlacesInput";

const CheckOut = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const addressInfo = user?.address.split("|");
  const [order, setOrder] = useState<OrderType>({
    ...cart,
    name: user?.name,
    email: user?.email,
    address: addressInfo && addressInfo[0],
    phonenumber: user?.phone,
    lat: addressInfo && parseFloat(addressInfo[1]),
    lng: addressInfo && parseFloat(addressInfo[2]),
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
                    backgroundColor: theme.bkg2,
                    borderColor: theme.accent,
                  }}
                  placeholder="Phone Number"
                  placeholderTextColor={"#A9A9A9"}
                  editable={false}
                  defaultValue={user?.phone}
                  className=" py-2 px-4 rounded-xl border-[1px]"
                />
              </View>
              <View className="mt-2 ml-2">
                <Text className="font-bold text-sm ml-1 text-neutral-500 mb-2">
                  Address
                  <Text className="text-red-500">*</Text>
                </Text>
                <GooglePlacesInput
                  theme={theme}
                  onAddressSelect={onAddressSelect}
                  value={order.address}
                />
              </View>
              <View className="pl-2 mt-3">
                <Text className="font-bold text-sm ml-1 text-neutral-500 mb-2">
                  Nearest Bus Stop
                </Text>
                <TextInput
                  style={{
                    color: theme.text,
                    backgroundColor: theme.bkg2,
                    borderColor: theme.accent,
                  }}
                  placeholder={"Nearest Bus Stop"}
                  placeholderTextColor={"#A9A9A9"}
                  className="py-2 px-4 rounded-xl border-[1px]"
                />
              </View>
              <View className="pl-2 mt-3">
                <Text className="font-bold text-sm ml-1 text-neutral-500 mb-2">
                  Zip/Postal Code
                </Text>
                <TextInput
                  style={{
                    color: theme.text,
                    backgroundColor: theme.bkg2,
                    borderColor: theme.accent,
                  }}
                  placeholder={"Zip/Postal Code"}
                  placeholderTextColor={"#A9A9A9"}
                  className="py-2 px-4 rounded-xl border-[1px]"
                />
              </View>
            </View>
          </View>
          <View
            className="rounded-3xl px-3 py-4 mb-2 border-[1px]"
            style={{
              backgroundColor: theme.accentV,
              borderColor: theme.accent,
            }}
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
      {!b && <View className="h-[1px] w-full self-center my-2" />}
    </>
  );
};
export default CheckOut;

const styles = StyleSheet.create({});
