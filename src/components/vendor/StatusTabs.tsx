import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const TABS = ["All", "Pending", "Preparing", "Ready"];

const StatusTabs = ({ active, onChange }: any) => {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = active === tab;

        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onChange(tab)}
          >
            <Text
              style={[
                styles.tabText,
                isActive && styles.activeText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default StatusTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  activeTab: {
    backgroundColor: "#16A34A",
    borderColor: "#16A34A",
  },
  tabText: {
    color: "#6B7280",
    fontWeight: "500",
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
});
