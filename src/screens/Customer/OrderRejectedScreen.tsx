import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderRejectedScreen = ({ route, navigation }: any) => {
  const { orderId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Order Rejected ❌</Text>
      <Text style={styles.sub}>
        Sorry, the vendor could not accept your order.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Order ID</Text>
        <Text style={styles.value}>{orderId}</Text>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.replace("MainTabs")}
      >
        <Text style={styles.btnText}>Go Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OrderRejectedScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 22, fontWeight: "700", color: "#E53935" },
  sub: { fontSize: 16, marginTop: 8, color: "#666", textAlign: "center" },
  card: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FDECEA",
    width: "100%",
  },
  label: { fontSize: 12, color: "#999" },
  value: { fontSize: 14, fontWeight: "600", marginTop: 4 },
  btn: {
    marginTop: 32,
    backgroundColor: "#000",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  btnText: { color: "#fff", fontWeight: "600" },
});
