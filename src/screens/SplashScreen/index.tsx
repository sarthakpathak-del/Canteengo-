import React, { useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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

    const timer = setTimeout(() => {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        navigation.replace("WelcomeScreen");
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
    backgroundColor: "#1C274C",
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
    color: "#FFFFFF",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});

export default SplashScreen;
