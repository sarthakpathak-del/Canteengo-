import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSocket } from "../../services/socket.service";

const OrderWaitingScreen = ({ route, navigation }: any) => {
  const { orderId } = route.params;

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    console.log("👂 Customer waiting for order updates...");

    const handler = (order: any) => {
      console.log("🟢 Order updated:", order);

      if (order._id !== orderId) return;

      if (order.status === "Accepted") {
        navigation.replace("OrderPreparingScreen", { orderId: order._id });
      }

      if (order.status === "Rejected") {
        navigation.replace("OrderRejectedScreen", { orderId: order._id });
      }
    };

    socket.on("order-updated", handler);

    return () => {
      socket.off("order-updated", handler);
    };
  }, [orderId]);

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.title}>Waiting for vendor confirmation</Text>
      <Text style={styles.sub}>
        Your order has been sent. Please wait...
      </Text>
    </SafeAreaView>
  );
};

export default OrderWaitingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 18, fontWeight: "600", marginTop: 16 },
  sub: { fontSize: 14, color: "#666", marginTop: 8 },
});
