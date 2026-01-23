import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const SearchBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        placeholder='Search for "Maggi" or "Tea"'
        placeholderTextColor="#9CA3AF"
        style={styles.input}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 12,
  },
  icon: { fontSize: 16, marginRight: 6 },
  input: { flex: 1, fontSize: 14 },
});
