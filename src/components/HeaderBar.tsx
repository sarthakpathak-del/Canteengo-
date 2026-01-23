import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const HeaderBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.smallText}>Your canteen</Text>
        <Text style={styles.canteenText}>📍 Campus Canteen A</Text>
      </View>

      <Image
        source={{ uri: "https://i.pravatar.cc/100" }}
        style={styles.avatar}
      />
    </View>
  );
};

export default HeaderBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  smallText: { fontSize: 12, color: "#9CA3AF" },
  canteenText: { fontSize: 14, fontWeight: "600", color: "#FF7A00" },
  avatar: { width: 36, height: 36, borderRadius: 18 },
});
