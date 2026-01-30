import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import FoodCard from "./FoodCard";
import { FoodItemBase } from "../screens/Customer/HomeScreen";



type PopularSectionProps = {
  data: FoodItemBase[];
  cart: Record<string, number>;
  onAdd: (item: FoodItemBase) => void;
  onRemove: (item: FoodItemBase) => void;
};


const PopularSection: React.FC<PopularSectionProps> = ({
  data,
  cart,
  onAdd,
  onRemove,
}) => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Popular now 🔥</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      <View style={styles.grid}>
        {data.map((item) => (
          <FoodCard
            key={item._id}
            item={item}
            qty={cart[item._id] || 0}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        ))}
      </View>
    </View>
  );
};



export default PopularSection;


const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  grid: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

  title: { fontSize: 16, fontWeight: "700" },
  viewAll: { fontSize: 12, color: "#FF7A00", fontWeight: "600" },
});
