import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import FoodCard from "./FoodCard";
import { FoodItem } from "../types/food";

const mockData: FoodItem[] = [
  {
    id: "1",
    name: "Veg Samosa (2 pcs)",
    subtitle: "With green chutney",
    price: 20,
    image: require("../assets/images/Samosa.png"),

    rating: 4.5,
    totalOrders: 120,
    description:
      "Crispy golden samosas stuffed with spiced potatoes and peas, served with fresh green chutney.",
    prepTime: "10 mins",
    addons: [
      { id: "a1", name: "Extra Chutney", price: 5 },
      { id: "a2", name: "Butter", price: 10 },
    ],
  },
  {
    id: "2",
    name: "Grilled Sandwich",
    subtitle: "Cheese & veggies",
    price: 45,
    image: require("../assets/images/Sandwich.png"),

    rating: 4.3,
    totalOrders: 98,
    description:
      "Toasted bread loaded with melted cheese, fresh vegetables, and house special sauce.",
    prepTime: "12 mins",
    addons: [
      { id: "a3", name: "Extra Cheese", price: 15 },
      { id: "a4", name: "Jalapenos", price: 10 },
    ],
  },
  {
    id: "3",
    name: "Masala Chai",
    subtitle: "Cutting chai",
    price: 10,
    image: require("../assets/images/Masala.png"),

    rating: 4.8,
    totalOrders: 250,
    description:
      "Strong Indian tea brewed with milk, ginger, and aromatic spices.",
    prepTime: "5 mins",
    addons: [
      { id: "a5", name: "Extra Ginger", price: 5 },
      { id: "a6", name: "Elaichi", price: 5 },
    ],
  },
  {
    id: "4",
    name: "Veg Masala Maggi",
    subtitle: "Spicy, with veggies",
    price: 35,
    image: require("../assets/images/Maggi.png"),

    rating: 4.4,
    totalOrders: 180,
    description:
      "Classic Maggi noodles cooked with fresh vegetables and special masala.",
    prepTime: "8 mins",
    addons: [
      { id: "a7", name: "Extra Cheese", price: 15 },
      { id: "a8", name: "Fried Egg", price: 20 },
    ],
  },
  {
    id: "5",
    name: "Paneer Puff",
    subtitle: "Crispy bakery snack",
    price: 25,
    image: require("../assets/images/Samosa.png"),

    rating: 4.1,
    totalOrders: 76,
    description:
      "Flaky puff pastry filled with spicy paneer masala.",
    prepTime: "10 mins",
    addons: [
      { id: "a9", name: "Extra Paneer", price: 15 },
    ],
  },
  {
    id: "6",
    name: "Cold Coffee",
    subtitle: "Chilled & creamy",
    price: 40,
    image: require("../assets/images/Sandwich.png"),

    rating: 4.6,
    totalOrders: 140,
    description:
      "Refreshing cold coffee blended with milk and ice cream.",
    prepTime: "7 mins",
    addons: [
      { id: "a10", name: "Extra Ice Cream", price: 20 },
      { id: "a11", name: "Chocolate Syrup", price: 10 },
    ],
  },
  {
    id: "7",
    name: "Veg Burger",
    subtitle: "With mayo & lettuce",
    price: 50,
    image: require("../assets/images/Maggi.png"),

    rating: 4.2,
    totalOrders: 110,
    description:
      "Crispy veg patty burger with fresh lettuce, tomato, and creamy mayo.",
    prepTime: "15 mins",
    addons: [
      { id: "a12", name: "Extra Patty", price: 25 },
      { id: "a13", name: "Cheese Slice", price: 15 },
    ],
  },
  {
    id: "8",
    name: "French Fries",
    subtitle: "Crispy & salted",
    price: 30,
    image: require("../assets/images/Samosa.png"),

    rating: 4.7,
    totalOrders: 300,
    description:
      "Golden crispy french fries lightly salted.",
    prepTime: "6 mins",
    addons: [
      { id: "a14", name: "Cheese Dip", price: 15 },
      { id: "a15", name: "Peri Peri Masala", price: 10 },
    ],
  },
];



const PopularSection: React.FC = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Popular now 🔥</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      <View style={styles.grid}>
        {mockData.map((item) => (
          <FoodCard key={item.id} item={item} />
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
