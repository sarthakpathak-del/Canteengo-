import React, { useState } from "react";
import { View, StyleSheet } from "react-native";


import BottomTabBar, { TabKey } from "./BottomTabBar";
import CartScreen from "../../screens/Customer/Cart/CartScreen";
import HomeScreen from "../../screens/Customer/HomeScreen";
import OrdersScreen from "../../screens/Customer/Orders/OrdersScreen";
import ProfileScreen from "../../screens/Customer/Profile/ProfileScreen";

const MainTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("Home");

  const renderScreen = () => {
    switch (activeTab) {
      case "Home":
        return <HomeScreen goToCart={() => setActiveTab("Cart")} />;

      case "Cart":
        return <CartScreen />;

      case "Orders":
        return <OrdersScreen />;

      case "Profile":
        return <ProfileScreen />;

      default:
        return <HomeScreen goToCart={() => setActiveTab("Cart")} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>{renderScreen()}</View>
      <BottomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
};


export default MainTabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7EF",
  },
  content: {
    flex: 1,
  },
});
