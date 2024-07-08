import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Image } from "expo-image";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      contact: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  
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
              source={require("@/assets/images/logo.png")}
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
                    placeholder="Name"
                    placeholderTextColor={"#CCCCCC"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={[styles.input]}
                    className="text-white px-4 py-3 outline-dashed"
                    editable={!isLoading}
                  />
                )}
                name="name"
              />
              {errors.name && (
                <Text className="text-red-600 mt-1 w-full text-right">
                  Name is required.
                </Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor={"#CCCCCC"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    style={[styles.input]}
                    className="text-white px-4 py-3 outline-dashed"
                    editable={!isLoading}
                  />
                )}
                name="contact"
              />
              {errors.email && (
                <Text className="text-red-600 mt-1 w-full text-right">
                  Phone Number is required.
                </Text>
              )}
            </View>
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
              <Controller
                control={control}
                rules={{ required: true, validate: (value, formValues) => value === formValues["password"] }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View>
                    <TextInput
                      placeholder="Confirm Password"
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
                name="confirmPassword"
              />
              {errors.password && (
                <Text className="text-red-600 mt-1 w-full text-right">
                  Confirm Password is required.
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
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
