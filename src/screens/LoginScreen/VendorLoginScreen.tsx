import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

export const VendorLoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vendor login</Text>
      </View>

      {/* Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Canteen Admin</Text>
        <Text style={styles.subtitle}>
          Login securely to manage today's orders.
        </Text>
      </View>

      {/* Email */}
      <View style={styles.field}>
        <Text style={styles.label}>Canteen email</Text>
        <TextInput
          style={styles.input}
          placeholder="admin@canteen.edu"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <View style={styles.field}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="••••••••"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showText}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("MainTabsVendor" as never)}>
        <Text style={styles.loginButtonText}>Login as Vendor</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default VendorLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7EF",
    paddingHorizontal: scale(20),
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: scale(8),
  },

  backBtn: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(8),
  },

  backIcon: {
    fontSize: scale(22),
    color: "#111827",
  },

  headerTitle: {
    fontSize: scale(16),
    color: "#9CA3AF",
    fontWeight: "500",
  },

  titleSection: {
    marginTop: scale(28),
  },

  title: {
    fontSize: scale(28),
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: scale(15),
    color: "#9CA3AF",
    marginTop: scale(6),
  },

  field: {
    marginTop: scale(24),
  },

  label: {
    fontSize: scale(13),
    color: "#9CA3AF",
    marginBottom: scale(8),
  },

  input: {
    height: scale(52),
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: scale(14),
    fontSize: scale(15),
    color: "#111827",
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: scale(52),
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: scale(14),
  },

  passwordInput: {
    flex: 1,
    fontSize: scale(15),
    color: "#111827",
  },

  showText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#FF7A00",
  },

  forgotText: {
    marginTop: scale(12),
    fontSize: scale(13),
    color: "#FF7A00",
    fontWeight: "600",
  },

  loginButton: {
    backgroundColor: "#FF7A00",
    borderRadius: scale(14),
    height: scale(54),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(28),
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "700",
  },
});
