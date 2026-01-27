import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import BottomTabBar, { TabKey } from "./BottomTabBar";
import HomeScreen from "../../screens/Customer/HomeScreen";
import VendorProductsScreen from "./VendorProductsScreen";
import OrdersScreen from "../../screens/Vendor/OrdersScreen";
import VendorProfileScreen from "../../screens/Vendor/VendorProfileScreen";

const MainTabsVendor: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("Home");

  const renderScreen = () => {
    switch (activeTab) {
      case "Home":
        return <OrdersScreen />;
      case "Product":
        return <VendorProductsScreen />;
      case "Profile":
        return <VendorProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
};

export default MainTabsVendor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7EF",
  },
  content: {
    flex: 1,
  },
});
