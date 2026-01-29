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
import { SocialButtons } from "../../components/SocialButtons";

const { width } = Dimensions.get("window");

const scale = (size: number) => (width / 375) * size;

const CustomerLoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer login</Text>
      </View>

      <View style={styles.welcomeSection}>
        <Text style={styles.welcomeTitle}>Welcome back 👋</Text>
        <Text style={styles.welcomeSubtitle}>
          Login to order from CanteenGo.
        </Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Email address</Text>

        <TextInput
          style={styles.emailInput}
          placeholder="Enter your email"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.helperText}>
          We’ll send you a one-time password (OTP) on email.
        </Text>

        <TouchableOpacity
          style={styles.otpButton}
          onPress={() => navigation.navigate("MainTabs" as never)}
        >
          <Text style={styles.otpButtonText}>Get OTP</Text>
        </TouchableOpacity>
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialRow}>
          <SocialButtons />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          New here?{" "}
          <Text style={styles.createAccount}>Create account</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CustomerLoginScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF7",
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
    fontSize: scale(32),
    color: "#111827",
  },

  headerTitle: {
    fontSize: scale(16),
    color: "#9CA3AF",
    fontWeight: "500",
  },

  welcomeSection: {
    marginTop: scale(28),
  },

  welcomeTitle: {
    fontSize: scale(28),
    fontWeight: "700",
    color: "#111827",
  },

  welcomeSubtitle: {
    fontSize: scale(15),
    color: "#9CA3AF",
    marginTop: scale(6),
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: scale(24),
    marginTop: scale(24),
    padding: scale(4),
  },

  tab: {
    flex: 1,
    paddingVertical: scale(10),
    borderRadius: scale(20),
    alignItems: "center",
  },

  activeTab: {
    backgroundColor: "#FFFFFF",
  },

  tabText: {
    fontSize: scale(14),
    color: "#9CA3AF",
    fontWeight: "600",
  },

  activeTabText: {
    color: "#111827",
  },

  form: {
    marginTop: scale(28),
  },

  label: {
    fontSize: scale(13),
    color: "#9CA3AF",
    marginBottom: scale(8),
  },

  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: scale(12),
    height: scale(52),
  },

  countryCode: {
    marginRight: scale(8),
  },

  countryCodeText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#111827",
  },

  phoneInput: {
    flex: 1,
    fontSize: scale(15),
    color: "#111827",
  },

  helperText: {
    fontSize: scale(12),
    color: "#9CA3AF",
    marginTop: scale(8),
  },

  otpButton: {
    backgroundColor: "#FF7A00",
    borderRadius: scale(14),
    height: scale(54),
    alignItems: "center",
    justifyContent: "center",
    marginTop: scale(24),
  },

  otpButtonText: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "700",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: scale(24),
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },

  dividerText: {
    marginHorizontal: scale(10),
    fontSize: scale(12),
    color: "#9CA3AF",
  },

  socialRow: {

    alignItems: "center",
    gap: scale(12),
  },

  socialIcon: {
    fontSize: scale(16),
  },

  socialText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#111827",
  },

  footer: {
    marginTop: "auto",
    paddingVertical: scale(20),
    alignItems: "center",
  },

  footerText: {
    fontSize: scale(14),
    color: "#9CA3AF",
  },

  createAccount: {
    color: "#FF7A00",
    fontWeight: "700",
  },
  emailInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#fff",
  },

});
