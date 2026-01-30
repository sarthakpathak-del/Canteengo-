import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FoodItemBase } from "../screens/Customer/HomeScreen";

export interface FoodItem {
  id: string;
  image: any;
  name: string;
  subtitle: string;
  price: number;
}

type Props = {
  item: FoodItemBase;
  qty: number;
  onAdd: (item: FoodItemBase) => void;
  onRemove: (item: FoodItemBase) => void;
};


const FoodCard: React.FC<Props> = ({ item, qty, onAdd, onRemove }) => {
  const navigation = useNavigation<any>();

  const goToDetails = () => {
    navigation.navigate("FoodDetailsScreen", {
      item,
      initialQty: qty || 1,
    });
  };

  const imageUrl =
    item.image ||
    "https://via.placeholder.com/300x200.png?text=Food+Image";

  return (
    <View style={styles.card}>
      {/* Image + Info = Navigate */}
      <TouchableOpacity onPress={goToDetails}>
        {/* ✅ FIXED IMAGE */}
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={styles.name}>{item.name}</Text>

        {/* ✅ SAFE SUBTITLE */}
        {item.subtitle ? (
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        ) : (
          <Text style={styles.subtitle} numberOfLines={2}>
            {item.description}
          </Text>
        )}
      </TouchableOpacity>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>₹{item.price}</Text>

        {qty === 0 ? (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => onAdd(item)}
          >
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyBox}>
            <TouchableOpacity onPress={() => onRemove(item)}>
              <Text style={styles.qtyBtn}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qty}>{qty}</Text>

            <TouchableOpacity onPress={() => onAdd(item)}>
              <Text style={styles.qtyBtn}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default FoodCard;


const styles = StyleSheet.create({
  card: {
    width: "50%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  image: { width: "100%", height: 100, borderRadius: 10 },

  name: { fontSize: 14, fontWeight: "700", marginTop: 6 },
  subtitle: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  price: { fontSize: 14, fontWeight: "700" },

  addBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#FFF1E6",
    alignItems: "center",
    justifyContent: "center",
  },

  addText: {
    fontSize: 18,
    color: "#FF7A00",
    fontWeight: "700",
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF1E6",
    borderRadius: 8,
    paddingHorizontal: 6,
    height: 28,
  },

  qtyBtn: {
    fontSize: 16,
    color: "#FF7A00",
    fontWeight: "700",
    paddingHorizontal: 6,
  },

  qty: {
    fontSize: 12,
    fontWeight: "700",
    marginHorizontal: 4,
  },
});
