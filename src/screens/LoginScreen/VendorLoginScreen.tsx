import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { postLoginvendor } from "../../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connectSocket } from "../../services/socket.service";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;


export const VendorLoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }
    setLoading(true);

    try {
      const response = await postLoginvendor(email, password);
      setLoading(false);

      if (response.status === 200 && response.data.success) {
        const { token, user } = response.data;

        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));

        const userId = user?.id || user?._id;

        if (userId) {
          console.log("🔌 Vendor connecting socket:", userId);
          connectSocket(userId);
        } else {
          console.warn("⚠️ Vendor userId missing for socket connection");
        }

        console.log("✅ Token and user saved in AsyncStorage");
        navigation.navigate("MainTabsVendor" as never);

      } else {
        Alert.alert("Login Failed", response.data?.message || "Unknown error");
      }
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Login Failed", error.response?.data?.message || error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vendor login</Text>
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.title}>Canteen Admin</Text>
        <Text style={styles.subtitle}>
          Login securely to manage today's orders.
        </Text>
      </View>

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

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Login as Vendor</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export default VendorLoginScreen;

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
