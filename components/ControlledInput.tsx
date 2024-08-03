import { Pressable, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ControlledInputType } from "@/constants/types";
import { useTheme } from "@/hooks";

export function getInputIcon(name: string) {
  switch (name) {
    case "name":
      return "user";
    case "mobileNumber":
    case "contact":
      return "phone";
    case "p":
      return "key";
    case "email":
      return "mail";
    case "address":
      return "enviromento";
    default:
      return "user";
  }
}

const ControlledInput = ({
  isLoading,
  control,
  error,
  name,
  p,
  label,
}: ControlledInputType) => {
  const [viewPassword, setViewPassword] = useState(false);
  const { theme } = useTheme();
  const iconName = p ? getInputIcon("p") : getInputIcon(name);

  return (
    <View className="mb-4" style={{ zIndex: -1 }}>
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
          <View
            style={{
              backgroundColor: theme.bkg2,
              borderColor: theme.accent,
            }}
            className="pr-2 rounded-lg border-[1px] py-2 flex-row items-center"
          >
            <View className="ml-3">
              <AntDesign name={iconName as any} size={20} color={"#A9A9A9"} />
            </View>
            <TextInput
              placeholder={label}
              placeholderTextColor={"#A9A9A9"}
              onBlur={onBlur}
              onChangeText={onChange}
              style={{ color: theme.text }}
              className="flex-1 ml-2"
              defaultValue={value}
              editable={!isLoading}
              secureTextEntry={p ? !viewPassword : undefined}
            />
            <View className="mr-2">
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
            ? `${label} is required`
            : error?.type === "validate"
            ? "Passwords do not match"
            : "Error"}
        </Text>
      )}
    </View>
  );
};

export default ControlledInput;
