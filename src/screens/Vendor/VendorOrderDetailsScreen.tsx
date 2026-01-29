import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,

} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { VendorOrder } from "./OrdersScreen";
import { SafeAreaView } from "react-native-safe-area-context";

type RouteParams = {
    params: {
        order: VendorOrder;
    };
};

const VendorOrderDetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<RouteParams, "params">>();
    const [status, setStatus] = useState(route.params.order.status);

    const order = route.params.order;

    const updateStatus = (newStatus: VendorOrder["status"]) => {
        setStatus(newStatus);

    };
    useEffect(() => {
        console.log("Order Params:", route.params.order);
        console.log("Order Items:", route.params.order.items);

        route.params.order.items.forEach((item, index) => {
            console.log(`Item ${index} image:`, item.image);
        });
    }, []);


    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.back}>‹</Text>
                </TouchableOpacity>

                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Order {order.id}</Text>
                    <Text style={styles.sub}>Pickup in 15 min</Text>
                </View>

                <View style={[styles.statusBadge, getBadgeStyle(status)]}>
                    <Text style={styles.statusText}>{status}</Text>
                </View>
            </View>

            <Card title="Customer">
                <Text style={styles.bold}>{order.customer.name}</Text>
                <Text style={styles.muted}>Phone: {order.customer.phone}</Text>
            </Card>

            <Card title="Items">
                {order.items.map((item, idx) => (
                    <View key={idx} style={styles.itemRow}>
                        <View style={styles.itemLeft}>
                            <Image source={item.image} style={styles.itemImage} />

                            <View>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemQty}>Qty: {item.qty}</Text>
                            </View>
                        </View>

                        <Text style={styles.itemPrice}>
                            ₹{item.price * item.qty}
                        </Text>
                    </View>
                ))}


                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>₹{order.amount}</Text>
                </View>
            </Card>


            {order.notes && (
                <Card title="Notes">
                    <Text style={styles.muted}>{order.notes}</Text>
                </Card>
            )}


            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => {
                        updateStatus("Rejected");
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.secondaryText}>Reject</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => {
                        updateStatus("Preparing")
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.primaryText}>Accept</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default VendorOrderDetailsScreen;

const Card = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        {children}
    </View>
);

const getBadgeStyle = (status: string) => {
    switch (status) {
        case "Pending":
            return { backgroundColor: "#FACC15" };
        case "Preparing":
            return { backgroundColor: "#BBF7D0" };
        case "Ready":
            return { backgroundColor: "#16A34A" };
        default:
            return { backgroundColor: "#E5E7EB" };
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF7",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,          // ⬆️ bigger
    gap: 12,
  },

  back: {
    fontSize: 44,        // ⬆️ bigger
    fontWeight: "800",
  },

  title: {
    fontSize: 22,        // ⬆️ bigger
    fontWeight: "900",
  },

  sub: {
    fontSize: 15,        // ⬆️ bigger
    color: "#64748B",
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },

  statusText: {
    fontSize: 14,
    fontWeight: "900",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,         // ⬆️ bigger
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#64748B",
    marginBottom: 10,
  },

  bold: {
    fontWeight: "800",
    fontSize: 17,
  },

  muted: {
    color: "#64748B",
    marginTop: 4,
    fontSize: 14,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#F1F5F9",
  },

  itemName: {
    fontWeight: "700",
    fontSize: 16,
  },

  itemQty: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },

  itemPrice: {
    fontWeight: "800",
    fontSize: 16,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
  },

  totalLabel: {
    fontWeight: "800",
    fontSize: 16,
  },

  totalValue: {
    fontWeight: "900",
    fontSize: 18,
  },

  actions: {
    marginTop: "auto",
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },

  primaryBtn: {
    backgroundColor: "#16A34A",
    borderRadius: 14,
    paddingVertical: 16,
    flex: 1,
    alignItems: "center",
  },

  primaryText: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 16,
  },

  secondaryBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 16,
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  secondaryText: {
    fontWeight: "800",
    fontSize: 16,
  },
});
