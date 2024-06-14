import * as React from "react";
import * as SecureStore from "expo-secure-store";

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  return result;
}

async function deleteItem(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export { save, getValueFor, deleteItem };
