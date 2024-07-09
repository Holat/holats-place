import { TextInput, TouchableOpacity, View, Text } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { searchApi } from "@/services/foodService";
import { FlatList } from "react-native-gesture-handler";
import { FoodItemType } from "@/constants/types";
import { Card, SearchLoading } from "@/components";
import { useTheme, useCart } from "@/hooks";

const Search = () => {
  const [searchInputTerm, setSearchInputTerm] = useState("");
  const [items, setItems] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (item: FoodItemType) => {
    addToCart(item);
  };

  const searchFood = useCallback(() => {
    if (searchInputTerm.trim().length > 0) {
      setIsLoading(true);
      searchApi(searchInputTerm)
        .then(setItems)
        .catch((error) => console.log(error))
        .finally(() => {
          setIsLoading(false);
        });
    } else setItems(null);
  }, [searchInputTerm]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <View className="w-full flex-row items-center justify-center gap-4 pt-6 px-2">
        <View>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign color={"black"} name={"left"} size={hp(4)} />
          </TouchableOpacity>
        </View>
        <View
          className="flex-1 bg-neutral-100 rounded-md  flex-row items-center pl-3"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 3,
          }}
        >
          <AntDesign name="search1" size={hp(3)} color={"#959595"} />
          <TextInput
            style={{ height: hp(5.5), textAlign: "center", color: "#959595" }}
            placeholder="Search"
            className=" bg-neutral-100 flex-1 pl-2 h-full mr-6 text-lg font-semibold"
            value={searchInputTerm}
            onChangeText={(text) => setSearchInputTerm(text)}
            cursorColor={"#FA6400"}
            textAlign="center"
            textAlignVertical="center"
            returnKeyType="search"
            onSubmitEditing={() => searchFood()}
          />
        </View>
        <View>
          <TouchableOpacity
            className=" bg-orange-500 rounded-md p-3 items-center justify-center"
            style={{ height: hp(5.5), width: hp(5.5) }}
          >
            <FontAwesome6 color={"white"} name={"sliders"} size={hp(2)} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card item={item} handleAddToCart={handleAddToCart} key={item.id} />
        )}
        showsVerticalScrollIndicator={false}
        className="mt-4 bg-transparent w-full mb-24"
        contentContainerStyle={{
          backgroundColor: "transparent",
          gap: 18,
          paddingHorizontal: 18,
          paddingVertical: 10,
        }}
        ListEmptyComponent={() => {
          return isLoading ? (
            <SearchLoading />
          ) : (
            <View className="flex-1 flex items-center justify-center mt-20">
              <AntDesign name="search1" size={26} color={"#cccccc"} />
              <Text className="mt-1 text-neutral-400">Search For Foods</Text>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Search;
