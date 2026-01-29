import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const VendorProfileScreen: React.FC = () => {
  const [online, setOnline] = useState(true);
  const navigation = useNavigation<any>();

  const handleLogout = async () => {
    try {
      // Disconnect socket if exists
      // if (typeof socket !== "undefined" && socket?.disconnect) {
      //   socket.disconnect();
      // }
      // Remove auth data
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      console.log("User logged out, storage cleared");

      // Navigate to Welcome screen and reset stack
      navigation.reset({
        index: 0,
        routes: [{ name: "WelcomeScreen" }],
      });
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Something went wrong while logging out.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>Profile</Text>
            <Text style={styles.headerSubtitle}>
              Basic account details
            </Text>
          </View>
        </View>
      </View>

      {/* Vendor Card */}
      <View style={styles.card}>
        <View style={styles.vendorIconCircle}>
          <Text style={styles.vendorIcon}>👨‍🍳</Text>
        </View>

        <Text style={styles.vendorName}>Campus Canteen</Text>
        <Text style={styles.vendorId}>Vendor ID: CAN-001</Text>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>+91 98765 43210</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>admin@canteen.edu</Text>
        </View>
      </View>

      {/* Canteen Status */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Canteen status</Text>

        <View style={styles.row}>
          <Text style={styles.label}>
            {online ? "Online" : "Offline"}
          </Text>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleHint}>Tap to change</Text>
            <Switch
              value={online}
              onValueChange={setOnline}
              trackColor={{ false: "#E5E7EB", true: "#86EFAC" }}
              thumbColor={online ? "#16A34A" : "#9CA3AF"}
            />
          </View>
        </View>
      </View>

      {/* Support */}
      <TouchableOpacity style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Help & support</Text>
          <Text style={styles.chevron}>›</Text>
        </View>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export default VendorProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF7",
    padding: 16,
  },

  /* Header */
  header: {
    backgroundColor: "#ECFEF3",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarIcon: {
    fontSize: 20,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },

  /* Vendor Card */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },

  vendorIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  vendorIcon: {
    fontSize: 32,
  },

  vendorName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  vendorId: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },

  /* Sections */
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  label: {
    fontSize: 14,
    color: "#475569",
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  toggleHint: {
    fontSize: 12,
    color: "#16A34A",
    marginRight: 6,
  },

  chevron: {
    fontSize: 22,
    color: "#94A3B8",
  },

  /* Logout */
  logoutBtn: {
    marginTop: "auto",
    borderWidth: 2,
    borderColor: "#EF4444",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },

  logoutText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EF4444",
  },
});
