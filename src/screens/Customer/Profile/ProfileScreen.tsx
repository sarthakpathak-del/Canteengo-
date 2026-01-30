import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

export default function ProfileScreen() {

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(["token", "user"]);
      navigation.reset({
        index: 0,
        routes: [{ name: "WelcomeScreen" as never }],
      });
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>Rohan Mehta</Text>
          <Text style={styles.subText}>
            +91 98765 43210 · rohan@college.edu
          </Text>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>15 orders completed</Text>
          </View>
        </View>
      </View>

      <MenuItem title="Order history" onPress={() => { }} />
      <MenuItem title="Saved pickup times" onPress={() => { }} />
      <MenuItem title="Contact support" onPress={() => { }} />

      <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
        <Text style={styles.logoutIcon}>→</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

function MenuItem({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.menuText}>{title}</Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF7",
    paddingHorizontal: scale(20),
    paddingTop: scale(16),
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(24),
  },

  avatarWrapper: {
    width: scale(72),
    height: scale(72),
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "#FF7A00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(14),
    backgroundColor: "#fff",
  },

  avatar: {
    width: scale(64),
    height: scale(64),
    borderRadius: 999,
  },

  name: {
    fontSize: scale(18),
    fontWeight: "800",
    color: "#111827",
  },

  subText: {
    fontSize: scale(13),
    color: "#6B7280",
    marginTop: 2,
  },

  badge: {
    backgroundColor: "#FFE6D2",
    alignSelf: "flex-start",
    paddingHorizontal: scale(12),
    paddingVertical: scale(6),
    borderRadius: 999,
    marginTop: scale(8),
  },

  badgeText: {
    fontSize: scale(12),
    fontWeight: "700",
    color: "#C2410C",
  },

  menuItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: scale(12),
  },

  menuText: {
    fontSize: scale(15),
    fontWeight: "600",
    color: "#111827",
  },

  chevron: {
    fontSize: scale(22),
    color: "#9CA3AF",
  },

  logoutRow: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: scale(16),
    paddingHorizontal: scale(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: scale(6),
  },

  logoutText: {
    fontSize: scale(15),
    fontWeight: "700",
    color: "#DC2626",
  },

  logoutIcon: {
    fontSize: scale(20),
    color: "#DC2626",
    fontWeight: "700",
  },
});
