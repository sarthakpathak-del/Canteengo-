import React from "react";
import { View, Text, StyleSheet } from "react-native";

const STATUS_COLORS: any = {
  Pending: { bg: "#FEF3C7", text: "#CA8A04" },
  Preparing: { bg: "#DCFCE7", text: "#15803D" },
  Ready: { bg: "#16A34A", text: "#fff" },
};

const OrderCard = ({ order }: any) => {
  const colors = STATUS_COLORS[order.status];

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.orderId}>
          {order.id} b7 {order.time}
        </Text>

        <View
          style={[
            styles.statusBadge,
            { backgroundColor: colors.bg },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              { color: colors.text },
            ]}
          >
            {order.status}
          </Text>
        </View>
      </View>

      <Text style={styles.items}>{order.items}</Text>

      <Text style={styles.amount}>₹{order.amount}</Text>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  orderId: {
    fontWeight: "700",
    fontSize: 14,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },
  items: {
    color: "#6B7280",
    marginBottom: 6,
  },
  amount: {
    fontWeight: "700",
    textAlign: "right",
  },
});
