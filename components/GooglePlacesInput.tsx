import React from "react";
import { GooglePlacesInputType } from "@/constants/types";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_API_GOOGLE_KEY || "";
const GooglePlacesInput = ({
  onAddressSelect,
  value,
  theme,
}: GooglePlacesInputType) => {
  return (
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
          flex: 0,
        },
        textInput: {
          color: theme.text,
          borderWidth: 1,
          borderRadius: 12,
          backgroundColor: theme.bkg2,
          borderColor: theme.accent,
          paddingLeft: 16,
        },
        listView: {
          backgroundColor: theme.bkg2,
          marginLeft: 8,
          borderRadius: 12,
        },
        row: {
          backgroundColor: "transparent",
        },
        separator: { backgroundColor: theme.bkg2, height: 1 },
        description: { color: theme.text },
      }}
    />
  );
};

export default GooglePlacesInput;
