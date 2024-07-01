import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TagTypes } from "@/constants/types";
import { Link, router } from "expo-router";

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
            key={index}
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
      className="bg-neutral-200 rounded-3xl mr-3 items-center justify-center"
      style={{
        backgroundColor: item === currentTag ? "#fed7aa" : "white",
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
      <Text className="text-base text-center">{item}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({});
