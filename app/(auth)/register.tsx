import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Link, router } from "expo-router";
import { RegisterValues } from "@/constants/types";
import { useAuth, useTheme } from "@/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import ControlledInput from "@/components/ControlledInput";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import GooglePlacesInput from "@/components/GooglePlacesInput";

const Register = () => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>();

  const onAddressSelect = (details: GooglePlaceDetail | null) => {
    if (!details) return;
    const {
      formatted_address,
      geometry: {
        location: { lat, lng },
      },
    } = details;
    const addr = `${formatted_address}|${lat}|${lng}`;
    setValue("address", addr);
  };

  const onSubmit = async (data: RegisterValues) => {
    setIsLoading(true);
    const isSuccess = await register(data);
    if (isSuccess) {
      setIsLoading(false);
      router.replace("/login");
    } else {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1">
        <Image
          source={require("@/assets/images/bg.jpg")}
          className=" flex-1 absolute h-full w-full"
          contentFit="cover"
          cachePolicy={"disk"}
        />
        <LinearGradient
          colors={["transparent", "#18181b"]}
          style={{ width: wp(100), height: hp(100) }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.95 }}
          className="flex items-center pb-12 space-y-8 justify-between flex-1"
        >
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={12}
            className="flex-1 items-center justify-between w-full mt-2 px-2"
          >
            <View
              className="w-full flex p-4 rounded-3xl"
              style={{ backgroundColor: theme.background }}
            >
              <Text
                className="font-bold text-2xl mb-4 ml-1"
                style={{ color: theme.text }}
              >
                Sign Up
              </Text>
              <ControlledInput
                name={"name"}
                isLoading={isLoading}
                control={control}
                error={errors.name}
                label="Name"
              />
              <ControlledInput
                name={"email"}
                isLoading={isLoading}
                control={control}
                error={errors.email}
                label="Email"
              />
              <ControlledInput
                name={"mobileNumber"}
                isLoading={isLoading}
                control={control}
                error={errors.mobileNumber}
                label="Mobile Number"
              />
              <View className="mb-2">
                <Controller
                  control={control}
                  name="address"
                  render={({}) => (
                    <GooglePlacesInput
                      theme={theme}
                      onAddressSelect={onAddressSelect}
                    />
                  )}
                />
                {errors.address && (
                  <Text className="text-red-600 mt-1 w-full text-right">
                    Address is required
                  </Text>
                )}
              </View>
              <ControlledInput
                name={"password"}
                isLoading={isLoading}
                control={control}
                error={errors.password}
                label="Password"
                p
              />
              <ControlledInput
                name={"confirmPassword"}
                isLoading={isLoading}
                control={control}
                error={errors.confirmPassword}
                label="Confirm password"
                p
              />
              <View>
                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  className="bg-orange-500 px-4 py-3 rounded-2xl mb-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color={"white"} size={28} />
                  ) : (
                    <Text className="font-bold text-white text-lg text-center">
                      Sign Up
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
          <View className="flex-row items-center mr-1">
            <Text className="text-base" style={{ color: theme.text }}>
              Already have an account?
            </Text>
            <Link
              style={{ color: theme.accent }}
              className="text-base"
              href={"/(auth)/login"}
            >
              Sign In
            </Link>
          </View>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

export default Register;
