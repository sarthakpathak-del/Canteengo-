import React, { useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OrdersHeader from "../../components/vendor/OrdersHeader";
import StatusTabs from "../../components/vendor/StatusTabs";
import OrdersList from "../../components/vendor/OrdersList";

import { ImageSourcePropType } from "react-native";

export type VendorOrder = {
  id: string;
  time: string;
  status: "Pending" | "Preparing" | "Ready" | "Rejected";
  amount: number;

  customer: {
    name: string;
    phone: string;
  };

  items: {
    name: string;
    qty: number;
    price: number;
    image: ImageSourcePropType; 
  }[];

  notes?: string;
};


const MOCK_ORDERS: VendorOrder[] = [
  {
    id: "#1284",
    time: "2:10 PM",
    status: "Pending",
    amount: 60,
    customer: {
      name: "Rohan Mehta",
      phone: "98xx-xx12",
    },
    items: [
      {
        name: "Samosa",
        qty: 1,
        price: 40,
        image: require("../../assets/images/Poha.jpeg"),
      },
      {
        name: "Tea",
        qty: 2,
        price: 20,
        image: require("../../assets/images/Masala.png"),
      },
    ],
    notes: "Less spicy, extra chutney.",
  },
  {
    id: "#1283",
    time: "2:05 PM",
    status: "Preparing",
    amount: 45,
    customer: {
      name: "Amit Shah",
      phone: "97xx-xx34",
    },
    items: [
      {
        name: "Cheese Maggi",
        qty: 1,
        price: 45,
        image: require("../../assets/images/Maggi.png"),
      },
    ],
  },
  {
    id: "#1281",
    time: "1:55 PM",
    status: "Ready",
    amount: 90,
    customer: {
      name: "Neha Verma",
      phone: "99xx-xx88",
    },
    items: [
      {
        name: "Grilled Sandwich",
        qty: 2,
        price: 45,
        image: require("../../assets/images/Sandwich.png"),
      },
    ],
  },
];


const OrdersScreen = () => {
  const [activeStatus, setActiveStatus] = useState("All");

  const filteredOrders = useMemo(() => {
    if (activeStatus === "All") return MOCK_ORDERS;
    return MOCK_ORDERS.filter((o) => o.status === activeStatus);
  }, [activeStatus]);

  return (
    <SafeAreaView style={styles.container}>
      <OrdersHeader />

      {/* <StatusTabs
        active={activeStatus}
        onChange={setActiveStatus}
      /> */}

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
