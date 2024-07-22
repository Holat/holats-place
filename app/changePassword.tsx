import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { useAuth, useTheme } from "@/hooks";
import { Controller, useForm } from "react-hook-form";
import { ChangePassFormType, CPControlledIn } from "@/constants/types";
import { router } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePassword = () => {
  const { changePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePassFormType>();

  const onSubmit = async (data: ChangePassFormType) => {
    setIsLoading(true);
    const isSuccess = await changePassword(data);
    if (isSuccess) {
      setIsLoading(false);
      router.replace("/login");
    } else {
      setIsLoading(false);
    }
  };
  return (
    <View style={{ backgroundColor: theme.background }} className="flex-1">
      <SafeAreaView className="flex-1 p-3">
        <Pressable
          style={{ backgroundColor: theme.accent }}
          className="flex-row p-2 items-center rounded-lg justify-start self-start mb-8"
          onPress={() => router.back()}
        >
          <AntDesign name="left" size={20} color={"white"} />
          <Text className="font-bold text-lg ml-2 text-white mr-2">Back</Text>
        </Pressable>
        <Text
          style={{ color: theme.text }}
          className="font-extrabold text-2xl mb-1"
        >
          Create new password
        </Text>
        <Text className=" leading-6 text-neutral-600 mb-5">
          Your new password must be different from previously used passwords.
          Make sure it's at least 8 characters long and includes a mix of
          letters, numbers, and special characters for added security.
        </Text>
        <ControlledInput
          control={control}
          name="currentPassword"
          error={errors.currentPassword}
          isLoading={isLoading}
          title="Current Password"
        />
        <ControlledInput
          control={control}
          name="newPassword"
          error={errors.newPassword}
          isLoading={isLoading}
          title="New Password"
        />
        <ControlledInput
          control={control}
          name="confirmNewPassword"
          error={errors.confirmNewPassword}
          isLoading={isLoading}
          title="Confirm Password"
        />
        <View>
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="bg-orange-500 px-4 py-3 rounded-lg mgb-1"
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={"white"} size={28} />
            ) : (
              <Text className="font-bold text-white text-lg text-center">
                Update Password
              </Text>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ChangePassword;

const ControlledInput = ({
  isLoading,
  control,
  error,
  name,
  title,
}: CPControlledIn) => {
  const [viewPassword, setViewPassword] = useState(false);
  const { theme } = useTheme();
  return (
    <View className="mb-4">
      <Controller
        control={control}
        rules={{
          required: true,
          validate: (value, formValues) => {
            if (name !== "confirmNewPassword") return true;
            return value === formValues["newPassword"];
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              placeholder={title}
              placeholderTextColor={"#A9A9A9"}
              onBlur={onBlur}
              onChangeText={onChange}
              style={{
                color: theme.text,
                backgroundColor: theme.bkg2,
                borderColor: theme.accent,
              }}
              value={value}
              className="pr-12 rounded-lg border-[1px] py-2 px-4"
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
              <Pressable onPress={() => setViewPassword((prev) => !prev)}>
                {viewPassword ? (
                  <Ionicons name="eye-off" color={"#CCCCCC"} size={22} />
                ) : (
                  <Ionicons name="eye" color={"#CCCCCC"} size={22} />
                )}
              </Pressable>
            </View>
          </View>
        )}
        name={name}
      />
      {error && (
        <Text className="text-red-600 mt-1 w-full text-right">
          {error?.type === "required"
            ? `${title} is required`
            : error?.type === "validate"
            ? "Passwords do not match"
            : "Error"}
        </Text>
      )}
    </View>
  );
};
