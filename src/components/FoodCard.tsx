import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FoodItem } from "../types/food";
import { useNavigation } from "@react-navigation/native";

type Props = {
  item: FoodItem;
};



const FoodCard: React.FC<Props> = ({ item }) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("FoodDetailsScreen", { item })
      }
    >
      <Image source={item.image} style={styles.image} />

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>

      <View style={styles.bottomRow}>
        <Text style={styles.price}>₹{item.price}</Text>
        <View style={styles.addBtn}>
          <Text style={styles.addText}>+</Text>
        </View>
      </View>
    </TouchableOpacity>
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
  addText: { fontSize: 18, color: "#FF7A00", fontWeight: "700" },
});
