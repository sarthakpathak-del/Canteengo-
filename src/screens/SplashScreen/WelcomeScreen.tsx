import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.title}>CanteenGo</Text>
        <Text style={styles.subtitle}>Campus snacks in a few taps.</Text>

        <View style={styles.bannerContainer}>
          <Image
            source={require("../../assets/images/Banner.png")}
            style={styles.banner}
            resizeMode="cover"
          />
        </View>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.continueText}>Continue as</Text>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("CustomerLoginScreen" as never)}
>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>👤</Text>
          </View>
          
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Customer</Text>
            <Text style={styles.cardSubtitle}>Order snacks for pickup</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("VendorLoginScreen" as never)}
>
          <View style={styles.iconCircle}>
            <Text style={styles.iconText}>🏪</Text>
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>Vendor</Text>
            <Text style={styles.cardSubtitle}>Manage canteen orders</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF7",
    paddingHorizontal: 20,
  },

  logo: {
    width: 80,
    height: 80,
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 12,
    color: "#1F2937",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
    textAlign: "center",
  },

  bannerContainer: {
    width: "100%",
    height: 270,
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 54,
    backgroundColor: "#FCD34D",
  },

  banner: {
    width: "100%",
    height: "100%",
  },

  bottomSection: {
    marginTop: "auto",  
    paddingBottom: 60,
  },

  continueText: {
    marginBottom: 12,
    color: "#9CA3AF",
    fontSize: 14,
    textAlign: "center",
  },

  card: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },

  iconText: {
    fontSize: 20,
  },

  cardText: {
    flex: 1,
    marginLeft: 12,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  cardSubtitle: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },

  arrow: {
    fontSize: 22,
    color: "#9CA3AF",
    paddingLeft: 8,
  },
});
