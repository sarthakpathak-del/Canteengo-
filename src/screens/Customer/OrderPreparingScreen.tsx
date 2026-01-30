import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderPreparingScreen = ({ route, navigation }: any) => {
  const { orderId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Order Accepted 🎉</Text>
      <Text style={styles.sub}>Your order is being prepared</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Order ID</Text>
        <Text style={styles.value}>{orderId}</Text>
      </View>

      <Text style={styles.note}>
        Please be ready for pickup in a few minutes.
      </Text>
    </SafeAreaView>
  );
};

export default OrderPreparingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 22, fontWeight: "700" },
  sub: { fontSize: 16, marginTop: 8, color: "#4CAF50" },
  card: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
    width: "100%",
  },
  label: { fontSize: 12, color: "#999" },
  value: { fontSize: 14, fontWeight: "600", marginTop: 4 },
  note: { marginTop: 24, fontSize: 14, color: "#666", textAlign: "center" },
});
