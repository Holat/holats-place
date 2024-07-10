import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TagTypes } from "@/constants/types";
import { Link, router } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

const Tags = ({ tags }: { tags: TagTypes[] }) => {
  const [currentTag, setCurrentTag] = useState("All");

  const handleSetTag = (tag: string) => {
    setCurrentTag(tag);
  };

  return (
    <ScrollView
      className="flex"
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {tags &&
        tags.map(({ name }: { name: string }, index: number) => (
          <Tag
            key={name + index}
            item={name}
            currentTag={currentTag}
            handleSetTag={handleSetTag}
          />
        ))}
    </ScrollView>
  );
};

export default Tags;

const Tag = ({
  item,
  currentTag,
  handleSetTag,
}: {
  item: string;
  currentTag: string;
  handleSetTag: (tag: string) => void;
}) => {
  return (
    <Pressable
      className="rounded-3xl mr-3 items-center justify-center flex px-2"
      style={{
        backgroundColor: item === currentTag ? "#1E1E1E" : "#1E1E1E",
        borderColor: item === currentTag ? "#FA6400" : "transparent",
        marginVertical: 4,
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        height: 36,
        width: 80,
      }}
      onPress={() => handleSetTag(item)}
    >
      <Text
        className="text-base text-center text-white"
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {item}
      </Text>
    </Pressable>
  );
};
// #fed7aa
const styles = StyleSheet.create({});
