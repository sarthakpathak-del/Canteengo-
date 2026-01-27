import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type OrderStatus = "PREPARING" | "READY" | "COMPLETED" | "CANCELLED";

type Order = {
  id: string;
  placedAt: string;
  pickupTime: string;
  itemsSummary: string;
  total: number;
  status: OrderStatus;
  isActive: boolean;
};

const mockOrders: Order[] = [
  {
    id: "204",
    placedAt: "Placed 2 mins ago",
    pickupTime: "12:30 - 12:45",
    itemsSummary: "2x Spicy Chicken • 1x Cola Zero",
    total: 12.5,
    status: "PREPARING",
    isActive: true,
  },
  {
    id: "203",
    placedAt: "Ready for pickup",
    pickupTime: "12:10 - 12:20",
    itemsSummary: "1x Veggie Wrap • 1x Orange Juice",
    total: 7.5,
    status: "READY",
    isActive: true,
  },
  {
    id: "198",
    placedAt: "Completed",
    pickupTime: "Yesterday",
    itemsSummary: "1x Coffee • 1x Croissant",
    total: 4.5,
    status: "COMPLETED",
    isActive: false,
  },
];
const statusStyles: Record<OrderStatus, any> = {
  PREPARING: { backgroundColor: "#FEF3C7" },
  READY: { backgroundColor: "#DCFCE7" },
  COMPLETED: { backgroundColor: "#E5E7EB" },
  CANCELLED: { backgroundColor: "#FEE2E2" },
};

const statusTextStyles: Record<OrderStatus, any> = {
  PREPARING: { color: "#F59E0B" },
  READY: { color: "#16A34A" },
  COMPLETED: { color: "#64748B" },
  CANCELLED: { color: "#DC2626" },
};


const OrdersScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"ACTIVE" | "PAST">("ACTIVE");

  const filteredOrders = mockOrders.filter((o) =>
    activeTab === "ACTIVE" ? o.isActive : !o.isActive
  );

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.orderId}>Order #{item.id}</Text>
        <View style={[styles.statusPill, statusStyles[item.status]]}>
          <Text style={[styles.statusText, statusTextStyles[item.status]]}>
            {item.status}
          </Text>
        </View>
      </View>

      <Text style={styles.placedAt}>{item.placedAt}</Text>

      <View style={styles.rowBetween}>
        <Text style={styles.pickup}>
          Pickup: {item.pickupTime}
        </Text>
        <Text style={styles.total}>${item.total.toFixed(2)}</Text>
      </View>

      <Text style={styles.items}>{item.itemsSummary}</Text>

      {/* {item.status === "READY" && (
        <TouchableOpacity>
          <Text style={styles.pickupCode}>View pickup code</Text>
        </TouchableOpacity>
      )} */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <Text style={styles.title}>Your Orders</Text>

            {/* Tabs */}
            <View style={styles.tabs}>
              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "ACTIVE" && styles.activeTab,
                ]}
                onPress={() => setActiveTab("ACTIVE")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "ACTIVE" && styles.activeTabText,
                  ]}
                >
                  Active
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.tab,
                  activeTab === "PAST" && styles.activeTab,
                ]}
                onPress={() => setActiveTab("PAST")}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "PAST" && styles.activeTabText,
                  ]}
                >
                  Past
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF7",
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 12,
    marginBottom: 12,
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 999,
    alignSelf: "flex-end",
    marginBottom: 12,
  },

  tab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
  },

  activeTab: {
    backgroundColor: "#FFFFFF",
  },

  tabText: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "600",
  },

  activeTabText: {
    color: "#0F172A",
  },

  card: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderId: { fontSize: 15, fontWeight: "700" },

  placedAt: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },

  pickup: { fontSize: 13, marginTop: 10 },
  total: { fontSize: 15, fontWeight: "800" },

  items: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 6,
  },

  pickupCode: {
    marginTop: 8,
    fontSize: 13,
    color: "#FF7A00",
    fontWeight: "700",
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
  },


  empty: { alignItems: "center", marginTop: 60 },
  emptyText: { fontSize: 14, color: "#9CA3AF" },
});


export default OrdersScreen;
