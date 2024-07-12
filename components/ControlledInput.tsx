import { Pressable, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { ControlledInputType } from "@/constants/types";
import { useTheme } from "@/hooks";

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

export default ControlledInput;
