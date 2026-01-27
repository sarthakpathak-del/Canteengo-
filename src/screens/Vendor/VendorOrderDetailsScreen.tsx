import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,

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
                        <Text>
                            {item.name} d7 {item.qty}
                        </Text>
                        <Text>₹{item.price * item.qty}</Text>
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
    container: { flex: 1, backgroundColor: "#F4FBF7" },

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
        gap: 10,
    },

    back: { fontSize: 28, fontWeight: "800" },

    title: { fontSize: 18, fontWeight: "800" },
    sub: { fontSize: 13, color: "#64748B" },

    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
    },

    statusText: { fontSize: 12, fontWeight: "800" },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 14,
        marginHorizontal: 16,
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    cardTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: "#64748B",
        marginBottom: 6,
    },

    bold: { fontWeight: "800", fontSize: 15 },
    muted: { color: "#64748B", marginTop: 2 },

    itemRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 6,
    },

    totalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        paddingTop: 8,
    },

    totalLabel: { fontWeight: "700" },
    totalValue: { fontWeight: "800" },

    actions: {
        marginTop: "auto",
        padding: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },

    primaryBtn: {
        backgroundColor: "#16A34A",
        borderRadius: 12,
        paddingVertical: 12,
        flex: 1,
        alignItems: "center",
    },

    primaryText: { color: "#FFFFFF", fontWeight: "800" },

    secondaryBtn: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        paddingVertical: 12,
        flex: 1,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    secondaryText: { fontWeight: "700" },
});
