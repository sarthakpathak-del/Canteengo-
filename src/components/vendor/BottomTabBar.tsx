import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HomeIcon from "../../assets/svg icon/HomeIcon";
import ProductIcon from "../../assets/svg icon/ProductIcon";
import ProfileIcon from "../../assets/svg icon/ProfileIcon";

export type TabKey = "Home" | "Product" | "Profile";

type Props = {
  activeTab: TabKey;
  onTabPress: (tab: TabKey) => void;
};

const BottomTabBar: React.FC<Props> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.container}>
      {(["Home", "Product", "Profile"] as TabKey[]).map((key) => {
        const isActive = activeTab === key;

        const IconComponent =
          key === "Home"
            ? HomeIcon
            : key === "Product"
            ? ProductIcon
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
                styles.iconWrapper,
                isActive && styles.activeIconWrapper,
              ]}
            >
              <IconComponent
                width={isActive ? 34 : 26}
                height={isActive ? 34 : 26}
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

export default BottomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  iconWrapper: {
    marginBottom: 4,
  },

  activeIconWrapper: {
    transform: [{ scale: 1.35 }],
  },

  label: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },

  activeLabel: {
    fontSize: 14,
    color: "#FF7A00",
    fontWeight: "700",
  },
});
