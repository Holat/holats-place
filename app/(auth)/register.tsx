import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image } from "expo-image";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Link, router } from "expo-router";
import { register } from "@/services/userService";
import { ControlledInputType, RegisterValues } from "@/constants/types";
import { useTheme } from "@/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      mobileNumber: "", //contact
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterValues) => {
    // setIsLoading(true);
    // const isSuccess = await register(data);
    // if (isSuccess) {
    //   setIsLoading(false);
    //   router.replace("/(home)/(tabs)/");
    // } else {
    //   setIsLoading(false);
    // }
    console.log(data);
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
            {/* <View className="self-start">
            <Image
              // entering={FadeInUp.duration(200).springify()}
              source={require("@/assets/images/logo.png")}
              style={{ height: hp(8), width: hp(8), marginTop: top }}
              className=""
            />
          </View> */}
            <View
              className="w-full flex p-4 rounded-lg"
              style={{ backgroundColor: theme.background }}
            >
              <Text
                className="font-bold text-2xl mb-4"
                style={{ color: theme.text }}
              >
                Sign Up
              </Text>
              <ControlledInput
                name={"name"}
                isLoading={isLoading}
                control={control}
                error={errors.name}
              />
              <ControlledInput
                name={"email"}
                isLoading={isLoading}
                control={control}
                error={errors.email}
              />
              <ControlledInput
                name={"mobileNumber"}
                isLoading={isLoading}
                control={control}
                error={errors.mobileNumber}
              />
              <ControlledInput
                name={"password"}
                isLoading={isLoading}
                control={control}
                error={errors.password}
                p
              />
              <ControlledInput
                name={"confirmPassword"}
                isLoading={isLoading}
                control={control}
                error={errors.confirmPassword}
                p
              />
              <View>
                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  className="bg-orange-500 px-4 py-3 rounded-lg"
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
          <Link
            style={{ color: theme.accent }}
            className="underline text-lg"
            href={"/(auth)/login"}
          >
            Login
          </Link>
        </LinearGradient>
      </SafeAreaView>
    </View>
  );
};

export default Register;

const ControlledInput = ({
  isLoading,
  control,
  error,
  name,
  p,
}: ControlledInputType) => {
  const [viewPassword, setViewPassword] = useState(false);
  const { theme } = useTheme();
  const uName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <View className="mb-4">
      <Controller
        control={control}
        rules={{
          required: true,
          validate: (value, formValues) => {
            if (name !== "confirmPassword") return true;
            return value === formValues["password"];
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              placeholder={uName}
              placeholderTextColor={"#CCCCCC"}
              onBlur={onBlur}
              onChangeText={onChange}
              style={{
                color: theme.text,
                backgroundColor: theme.bkg2,
                borderColor: theme.accent,
              }}
              value={value}
              className="pl-4 py-3 pr-12 rounded-lg border-[1px]"
              editable={!isLoading}
              secureTextEntry={p ? !viewPassword : undefined}
            />
            <View
              style={{
                top: "50%",
                position: "absolute",
                right: 16,
                transform: [{ translateY: -11 }],
              }}
            >
              {p && (
                <Pressable onPress={() => setViewPassword((prev) => !prev)}>
                  {viewPassword ? (
                    <Ionicons name="eye-off" color={"#CCCCCC"} size={22} />
                  ) : (
                    <Ionicons name="eye" color={"#CCCCCC"} size={22} />
                  )}
                </Pressable>
              )}
            </View>
          </View>
        )}
        name={name}
      />
      {error && (
        <Text className="text-red-600 mt-1 w-full text-right">
          {error?.type === "required"
            ? `${uName} is required`
            : error?.type === "validate"
            ? "Passwords do not match"
            : "Error"}
        </Text>
      )}
    </View>
  );
};
