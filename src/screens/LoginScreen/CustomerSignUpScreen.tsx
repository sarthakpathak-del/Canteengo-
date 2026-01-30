import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { postCustomerRegisterRequestOtp, postCustomerRegisterVerifyOtp } from "../../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connectSocket } from "../../services/socket.service";

const CustomerSignUpScreen: React.FC = () => {
    const navigation = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showOtp, setShowOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSignUp = async () => {
        if (!name || !email || !password) {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        try {
            setLoading(true);

            const res = await postCustomerRegisterRequestOtp(
                name,
                email,
                password
            );

            if (res.status === 200 && res.data.success) {
                setShowOtp(true); // ✅ show OTP input
            } else {
                Alert.alert("Sign Up Failed", res.data.message || "Something went wrong");
            }
        } catch (err: any) {
            Alert.alert(
                "Sign Up Failed",
                err.response?.data?.message || err.message
            );
        } finally {
            setLoading(false);
        }
    };
const handleVerifyOtp = async () => {
  if (otp.length !== 6) {
    Alert.alert("Error", "Please enter a valid 6-digit OTP");
    return;
  }

  try {
    setLoading(true);

    const res = await postCustomerRegisterVerifyOtp(
      name,
      email,
      password,
      otp
    );

    if (res.data?.success) {
      const { token, user } = res.data;

      if (token) {
        await AsyncStorage.setItem("token", token);
      }

      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
      }

      const userId = user?.id || user?._id;

      if (userId) {
        console.log("🔌 Connecting socket after signup:", userId);
        connectSocket(userId);
      } else {
        console.warn("⚠️ No userId found for socket connection");
      }

      Alert.alert("Success", "Account created successfully!");

      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" as never }],
      });

    } else {
      Alert.alert(
        "OTP Verification Failed",
        res.data?.message || "Invalid OTP"
      );
    }
  } catch (err: any) {
    console.log("Verify OTP Catch Error:", err?.response?.data || err);

    Alert.alert(
      "OTP Verification Failed",
      err.response?.data?.message || err.message
    );
  } finally {
    setLoading(false);
  }
};


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.backIcon}>‹</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Sign Up</Text>
                    </View>

                    {/* Welcome */}
                    <View style={styles.welcomeSection}>
                        <Text style={styles.welcomeTitle}>Create your account 👋</Text>
                        <Text style={styles.welcomeSubtitle}>
                            Join CanteenGo and start ordering easily.
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {!showOtp ? (
                            <>
                                <Text style={styles.label}>Full Name</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="John Doe"
                                    placeholderTextColor="#9CA3AF"
                                    autoCapitalize="words"
                                    value={name}
                                    onChangeText={setName}
                                />

                                <Text style={styles.label}>Email address</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#9CA3AF"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />

                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry
                                    autoCapitalize="none"
                                    value={password}
                                    onChangeText={setPassword}
                                />

                                <TouchableOpacity
                                    style={styles.primaryButton}
                                    onPress={handleSignUp}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.primaryButtonText}>Sign Up</Text>
                                    )}
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={[styles.label, { marginTop: 20 }]}>
                                    Enter 6-digit OTP
                                </Text>

                                <TextInput
                                    style={styles.otpInput}
                                    value={otp}
                                    onChangeText={(text) =>
                                        setOtp(text.replace(/[^0-9]/g, "").slice(0, 6))
                                    }
                                    keyboardType="numeric"
                                    maxLength={6}
                                    placeholder="------"
                                    placeholderTextColor="#9CA3AF"
                                />

                                <TouchableOpacity
                                    style={[
                                        styles.primaryButton,
                                        { marginTop: 20, opacity: loading ? 0.6 : 1 },
                                    ]}
                                    onPress={handleVerifyOtp}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.primaryButtonText}>Verify OTP</Text>
                                    )}
                                </TouchableOpacity>

                            </>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4FBF7",
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },

    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#F3F4F6",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
    },

    backIcon: {
        fontSize: 32,
        color: "#111827",
    },

    headerTitle: {
        fontSize: 16,
        color: "#9CA3AF",
        fontWeight: "500",
    },

    welcomeSection: {
        marginTop: 28,
    },

    welcomeTitle: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111827",
    },

    welcomeSubtitle: {
        fontSize: 15,
        color: "#9CA3AF",
        marginTop: 6,
    },

    form: {
        marginTop: 28,
    },

    label: {
        fontSize: 13,
        color: "#9CA3AF",
        marginBottom: 8,
        marginTop: 14,
    },

    input: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 14,
        fontSize: 16,
        color: "#111827",
        backgroundColor: "#fff",
    },

    primaryButton: {
        backgroundColor: "#FF7A00",
        borderRadius: 14,
        height: 54,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
    },

    primaryButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },

    otpInput: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 14,
        fontSize: 24,
        color: "#111827",
        textAlign: "center",
        letterSpacing: 14,
        backgroundColor: "#fff",
    },
});

export default CustomerSignUpScreen;
