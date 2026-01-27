import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderSuccessScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.iconCircle}>
        <Text style={styles.checkIcon}>✓</Text>
      </View>
      <Text style={styles.title}>Order placed!</Text>

      <Text style={styles.subtitle}>
        Order #CGO1284 has been sent to the canteen.{"\n"}
        We’ll notify you when it’s ready.
      </Text>

      <View style={styles.estimateCard}>
        <View style={styles.estimateRow}>
          <Text style={styles.estimateLabel}>Estimated pickup</Text>
          <Text style={styles.estimateTime}>1:05 PM (15 min)</Text>
        </View>

        <View style={styles.progressTrack}>
          <View style={styles.progressFill} />
        </View>

        <View style={styles.statusRow}>
          <Text style={styles.statusActive}>Pending</Text>
          <Text style={styles.status}>Preparing</Text>
          <Text style={styles.status}>Ready</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.trackBtn}>
        <Text style={styles.trackText}>Track Order</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.backText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF7",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },

  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1BA94C",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  checkIcon: {
    fontSize: 60,
    color: "#fff",
    fontWeight: "bold",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },

  estimateCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },

  estimateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  estimateLabel: {
    fontSize: 14,
    color: "#6B7280",
  },

  estimateTime: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },

  progressTrack: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 10,
  },

  progressFill: {
    width: "65%", // adjust for status
    height: "100%",
    backgroundColor: "#F97316",
    borderRadius: 3,
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statusActive: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "600",
  },

  status: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  trackBtn: {
    width: "100%",
    backgroundColor: "#FF6A00",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },

  trackText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  backBtn: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  backText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },
});


export default OrderSuccessScreen;
