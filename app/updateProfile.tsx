import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { router } from "expo-router";
import { RegisterValues } from "@/constants/types";
import { useAuth, useTheme } from "@/hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import ControlledInput from "@/components/ControlledInput";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import GooglePlacesInput from "@/components/GooglePlacesInput";
import { AntDesign } from "@expo/vector-icons";

const Register = () => {
  const { updateProfile, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { theme, value } = useTheme();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      mobileNumber: user?.phone,
      address: user?.address,
    },
  });

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
    const isSuccess = await updateProfile(data);
    if (isSuccess) {
      setIsLoading(false);
      router.back();
    } else {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: theme.background }}>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={12}
          className="items-center justify-between w-full mt-2 px-4"
        >
          <Pressable
            style={{ backgroundColor: theme.accent }}
            className="flex-row p-2 items-center rounded-lg justify-start self-start mb-8"
            onPress={() => router.back()}
          >
            <AntDesign name="left" size={20} color={"white"} />
            <Text
              style={{ color: theme.text }}
              className="font-bold text-lg ml-2"
            >
              Back
            </Text>
          </Pressable>
          <View
            className="w-full flex"
            style={{ backgroundColor: theme.background }}
          >
            <Text
              style={{ color: theme.text }}
              className="font-extrabold text-2xl mb-4"
            >
              Update your profile
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
                    value={value}
                  />
                )}
              />
              {errors.address && (
                <Text className="text-red-600 mt-1 w-full text-right">
                  Address is required
                </Text>
              )}
            </View>
            <View className="self-end" style={{ zIndex: -1 }}>
              <Pressable
                onPress={handleSubmit(onSubmit)}
                className="bg-orange-500 px-4 py-2 rounded-lg mb-1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={"white"} size={24} />
                ) : (
                  <Text className="font-bold text-white text-base text-center">
                    Update
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default Register;
