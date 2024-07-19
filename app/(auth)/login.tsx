import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useForm } from "react-hook-form";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import showToast from "@/utils/ToastM";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const onSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    const isSuccess = await login(data.email, data.password);
    if (isSuccess) {
      setIsLoading(false);
      router.replace("/(home)/(tabs)/");
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errors.email || errors.password) {
      showToast("Login Error", "Email and Password Required");
    }
  }, [errors]);

  return (
    <View className="flex-1">
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
          className="flex-1 items-center justify-between w-full p-5 gap-4"
        >
          <View className="self-start">
            <Animated.Image
              entering={FadeInUp.duration(200).springify()}
              source={require("@/assets/images/icon.png")}
              style={{ height: hp(8), width: hp(8), marginTop: top }}
              className=""
            />
          </View>
          <View className="w-full gap-y-4 flex">
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={"#CCCCCC"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={[styles.input]}
                    className="text-white px-4 py-3 outline-dashed"
                    editable={!isLoading}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text className="text-red-600 mt-1 w-full text-right">
                  Email is required.
                </Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      placeholder="Password"
                      placeholderTextColor={"#CCCCCC"}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      style={[styles.input]}
                      value={value}
                      className="text-white pl-4 py-3 pr-12"
                      editable={!isLoading}
                      secureTextEntry={!viewPassword}
                    />
                    <View
                      style={{
                        top: "50%",
                        position: "absolute",
                        right: 16,
                        transform: [{ translateY: -11 }],
                      }}
                    >
                      <Pressable
                        onPress={() => setViewPassword((prev) => !prev)}
                      >
                        {viewPassword ? (
                          <Ionicons
                            name="eye-off"
                            color={"#CCCCCC"}
                            size={22}
                          />
                        ) : (
                          <Ionicons name="eye" color={"#CCCCCC"} size={22} />
                        )}
                      </Pressable>
                    </View>
                  </View>
                )}
                name="password"
              />
              {errors.password && (
                <Text className="text-red-600 mt-1 w-full text-right">
                  Password is required.
                </Text>
              )}
            </View>
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
                    Login
                  </Text>
                )}
              </Pressable>
            </View>
            <Animated.View
              entering={FadeInDown.duration(100).delay(100).springify()}
            >
              <Pressable
                style={{ height: hp(6) }}
                className="flex items-center justify-center rounded-lg border-[1px] border-orange-500"
                onPress={() => router.push("/(auth)/register")}
                disabled={isLoading}
              >
                <Text
                  className=" text-white font-semibold"
                  style={{ fontSize: hp(2) }}
                >
                  Register
                </Text>
              </Pressable>
            </Animated.View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    borderColor: "#CCCCCC",
    borderWidth: 1.5,
    borderRadius: 10,
    color: "white",
  },
});
