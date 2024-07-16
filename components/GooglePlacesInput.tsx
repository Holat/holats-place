import React from "react";
import { GooglePlacesInputType } from "@/constants/types";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_API_GOOGLE_KEY || "";
const GooglePlacesInput = ({
  onAddressSelect,
  value,
  theme,
}: GooglePlacesInputType) => {
  return (
    <View
      style={{
        backgroundColor: theme.bkg2,
        borderColor: theme.accent,
        borderWidth: 1,
        borderRadius: 8,
      }}
      className="flex-row items-center"
    >
      <View className="ml-3">
        <AntDesign name="enviromento" size={20} color={"#A9A9A9"} />
      </View>
      <GooglePlacesAutocomplete
        query={{
          key: GOOGLE_API_KEY,
          language: "en",
          components: "country:ng",
        }}
        placeholder="Search Delivery Address"
        textInputProps={{
          placeholderTextColor: "#A9A9A9",
        }}
        fetchDetails={true}
        onPress={(_, details) => onAddressSelect(details)}
        styles={{
          container: {
            flex: 1,
          },
          textInput: {
            color: theme.text,
            backgroundColor: "transparent",
            paddingLeft: 8,
            paddingVertical: 8,
            borderRadius: 8,
            height: "100%",
          },
          listView: {
            backgroundColor: theme.bkg2,
            marginLeft: 8,
            borderRadius: 12,
            position: "absolute",
            top: "100%",
            marginTop: 4,
            zIndex: 10,
          },
          row: {
            backgroundColor: "transparent",
          },
          separator: { backgroundColor: theme.bkg2, height: 1 },
          description: { color: theme.text },
        }}
      />
    </View>
  );
};

export default GooglePlacesInput;
