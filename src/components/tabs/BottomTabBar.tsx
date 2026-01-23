import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type TabKey = "Home" | "Cart" | "Orders" | "Profile";

type Props = {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
};

const tabs: { key: TabKey; label: string; icon: string }[] = [
  { key: "Home", label: "Home", icon: "🏠" },
  { key: "Cart", label: "Cart", icon: "🛍️" },
  { key: "Orders", label: "Orders", icon: "📋" },
  { key: "Profile", label: "Profile", icon: "👤" },
];

const BottomTabBar: React.FC<Props> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onTabPress(tab.key)}
          >
            <Text style={[styles.icon, isActive && styles.activeIcon]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    fontSize: 20,
    color: "#9CA3AF",
  },

  activeIcon: {
    color: "#FF7A00",
  },

  label: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },

  activeLabel: {
    color: "#FF7A00",
    fontWeight: "700",
  },
});
