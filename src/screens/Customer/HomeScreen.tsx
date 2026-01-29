import React, { useState } from "react";
import { StyleSheet, ScrollView, FlatList, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "../../components/HeaderBar";
import { SearchBar } from "react-native-screens";
import PopularSection from "../../components/PopularSection";
import { FoodItem } from "../../types/food";
export type FoodItemBase = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: any;
};



const mockData: FoodItemBase[] = [
  {
    id: "1",
    name: "Veg Samosa (2 pcs)",
    subtitle: "With green chutney",
    price: 20,
    image: require("../../assets/images/Samosa.png"),
  },
  {
    id: "2",
    name: "Grilled Sandwich",
    subtitle: "Cheese & veggies",
    price: 45,
    image: require("../../assets/images/Sandwich.png"),
  },
  {
    id: "3",
    name: "Masala Chai",
    subtitle: "Cutting chai",
    price: 10,
    image: require("../../assets/images/Masala.png"),
  },
];
type HomeScreenProps = {
  goToCart: () => void;
  
};


const HomeScreen: React.FC<HomeScreenProps> = ({ goToCart }) => {

  const [cart, setCart] = useState<Record<string, number>>({});

  const handleAdd = (item: FoodItemBase) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const handleRemove = (item: FoodItemBase) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (!updated[item.id] || updated[item.id] <= 1) {
        delete updated[item.id];
      } else {
        updated[item.id] -= 1;
      }
      return updated;
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const totalAmount = mockData.reduce((sum, item) => {
    const qty = cart[item.id] || 0;
    return sum + qty * item.price;
  }, 0);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={
          <>
            <HeaderBar />
            <SearchBar />
            <PopularSection
              data={mockData}
              cart={cart}
              onAdd={handleAdd}
              onRemove={handleRemove}
            />
          </>
        }
      />

      {totalItems > 0 && (
        <View style={styles.viewCartBar}>
          <View>
            <Text style={styles.viewCartItems}>
              {totalItems} item(s)
            </Text>
            <Text style={styles.viewCartTotal}>
              ₹{totalAmount}
            </Text>
          </View>

          <TouchableOpacity style={styles.viewCartBtn}  onPress={goToCart}>
            <Text style={styles.viewCartText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF7",
    paddingHorizontal: 16,
  },
  viewCartBar: {
  position: "absolute",
  bottom: 10,
  left: 10,
  right: 10,
  backgroundColor: "#f67e29ff",
  borderRadius: 14,
  padding: 14,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
},

viewCartItems: {
  color: "#FFFFFF",
  fontSize: 12,
},

viewCartTotal: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "700",
},

viewCartBtn: {
  backgroundColor: "#FFFFFF",
  paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 8,
},

viewCartText: {
  color: "#16A34A",
  fontWeight: "700",
},

});
