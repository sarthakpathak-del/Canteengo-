import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connectSocket } from "../../services/socket.service";
const Logo = require("../../assets/images/adsrolelogo.jpeg");
const { width } = Dimensions.get("window");


const SplashScreen = () => {
  const navigation = useNavigation<any>();

  const scaleAnim = useRef(new Animated.Value(0.6)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const containerOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(async () => {
      const userString = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");

      const user = userString ? JSON.parse(userString) : null;

      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        console.log("🔍 Splash token:", token);
        console.log("🔍 Splash user:", user);

        const userId = user?.id || user?._id;

        if (token && user?.role === "customer" && userId) {
          console.log("🔌 Connecting socket for customer:", userId);
          connectSocket(userId);
          navigation.replace("MainTabs");

        } else if (token && user?.role === "vendor" && userId) {
          console.log("🔌 Connecting socket for vendor:", userId);
          connectSocket(userId);
          navigation.replace("MainTabsVendor");

        } else {
          console.log("➡️ No session, going to Welcome");
          navigation.replace("WelcomeScreen");
        }
      });

    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
      <Animated.Image
        source={Logo}
        style={[
          styles.logo,
          { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
        ]}
        resizeMode="contain"
      />
      <Animated.Text style={[styles.text, { opacity: opacityAnim }]}>
        Developed by AdsRole Company
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default SplashScreen;
