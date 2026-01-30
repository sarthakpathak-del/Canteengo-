import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrdersHeader from "../../components/vendor/OrdersHeader";
import OrdersList from "../../components/vendor/OrdersList";

import { getSocket } from "../../services/socket.service";

export type VendorOrder = {
  _id: string;
  createdAt: string;
  status: "Pending" | "Accepted" | "Rejected";
  totalPrice: number;

  customer: {
    _id: string;
    name?: string;
    phone?: string;
  };

  items: {
    _id: string;
    quantity: number;
    food: {
      _id: string;
      name: string;
      price: number;
      image: string; // URL
    };
  }[];

  notes?: string;
};



const OrdersScreen = () => {
  const [activeStatus, setActiveStatus] = useState("All");
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const socket = getSocket();

    if (!socket) {
      console.warn("⚠️ Vendor socket not connected");
      return;
    }

    console.log("👂 Vendor listening for new orders...");

    socket.on("new-order", (order) => {
      console.log("🛎️ New order received:", order);
      setOrders((prev) => [order, ...prev]);
    });

    return () => {
      socket.off("new-order");
    };
  }, []);

  const filteredOrders = useMemo(() => {
    if (activeStatus === "All") return orders;
    return orders.filter((o) => o.status === activeStatus);
  }, [activeStatus, orders]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OrdersHeader />

      <OrdersList orders={filteredOrders} />
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF7",
  },
});
