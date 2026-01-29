import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HomeIcon from "../../assets/svg icon/HomeIcon";
import VaultIcon from "../../assets/svg icon/CartIcon";
import ProfileIcon from "../../assets/svg icon/ProfileIcon";
import DocumentIcon from "../../assets/svg icon/OrderIcon";

export type TabKey = "Home" | "Cart" | "Orders" | "Profile";

type Props = {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
};

const BottomTabBar: React.FC<Props> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {(["Home", "Cart", "Orders", "Profile"] as TabKey[]).map((key) => {
        const isActive = activeTab === key;

        const IconComponent =
          key === "Home"
            ? HomeIcon
            : key === "Cart"
            ? VaultIcon
            : key === "Orders"
            ? DocumentIcon
            : ProfileIcon;

        return (
          <TouchableOpacity
            key={key}
            style={styles.tab}
            onPress={() => onTabPress(key)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                isActive && styles.activeIcon,
              ]}
            >
              <IconComponent
                width={isActive ? 30 : 24}
                height={isActive ? 30 : 24}
              />
            </View>

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {key}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
    elevation: 8, // Android shadow
  },
  tab: {
    alignItems: "center",
    minWidth: 60,
  },
  iconContainer: {
    marginBottom: 4,
  },
  activeIcon: {
    transform: [{ scale: 1.3 }],
  },
  label: {
    fontSize: 12,
    color: "#888",
  },
  activeLabel: {
    fontSize: 14,
    color: "#1C274C",
    fontWeight: "bold",
  },
});

export default BottomTabBar;
