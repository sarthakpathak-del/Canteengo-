import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OrdersHeader = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Today's Orders</Text>
        <Text style={styles.subtitle}>CanteenGo b7 Simple view</Text>
      </View>

      <Text style={styles.online}>Online</Text>
    </View>
  );
};

export default OrdersHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9FBF1",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  online: {
    color: "#16A34A",
    fontWeight: "600",
  },
});
