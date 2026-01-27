

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface FoodItem {
  image: any; 
  name: string;
  subtitle: string;
  price: number;
}

interface Props {
  item: FoodItem;
}

const FoodCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<any>();
  const [qty, setQty] = useState(0);

  const goToDetails = () => {
    navigation.navigate("FoodDetailsScreen", {
      item,
      initialQty: qty || 1,
    });
  };

  const increment = () => {
    setQty((q) => (q === 0 ? 1 : q + 1));
  };

  const decrement = () => {
    setQty((q) => (q <= 1 ? 0 : q - 1));
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={goToDetails}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </TouchableOpacity>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>₹{item.price}</Text>
        {qty === 0 ? (
          <TouchableOpacity style={styles.addBtn} onPress={increment}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyBox}>
            <TouchableOpacity onPress={decrement}>
              <Text style={styles.qtyBtn}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qty}>{qty}</Text>

            <TouchableOpacity onPress={increment}>
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

  /* ✅ QTY BOX STYLES (MISSING BEFORE) */
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
