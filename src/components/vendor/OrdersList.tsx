import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { VendorOrder } from "../../screens/Vendor/OrdersScreen";

type Props = {
  orders: VendorOrder[];
};

const OrdersList: React.FC<Props> = ({ orders }) => {
  const navigation = useNavigation<any>();

  return (
    <View>
      {orders.map((order) => (
        <TouchableOpacity
          key={order.id}
          style={styles.card}
          onPress={() =>
            navigation.navigate("VendorOrderDetailsScreen", {
              order,
            })
          }
        >
          <View style={styles.row}>
            <Text style={styles.id}>
              {order.id} • {order.time}
            </Text>

            <View style={[styles.badge, getBadgeStyle(order.status)]}>
              <Text style={styles.badgeText}>{order.status}</Text>
            </View>
          </View>

          <Text style={styles.items}>
            {order.items.map((i) => `${i.name} d7 ${i.qty}`).join(", ")}
          </Text>

          <Text style={styles.amount}>₹{order.amount}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OrdersList;

const getBadgeStyle = (status: string) => {
  switch (status) {
    case "Pending":
      return { backgroundColor: "#FEF3C7" };
    case "Preparing":
      return { backgroundColor: "#DCFCE7" };
    case "Ready":
      return { backgroundColor: "#16A34A" };
    default:
      return { backgroundColor: "#E5E7EB" };
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  id: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },

  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0F172A",
  },

  items: {
    marginTop: 6,
    color: "#64748B",
    fontSize: 14,
  },

  amount: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    alignSelf: "flex-end",
  },
});
