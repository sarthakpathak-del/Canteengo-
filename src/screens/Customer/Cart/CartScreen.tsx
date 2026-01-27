import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type CartItem = {
  id: string;
  name: string;
  price: number;
  subtitle?: string;
  prepTime?: string;
  qty: number;
  image: any;
};


const initialCart: CartItem[] = [
  {
    id: "1",
    name: "Veg Masala Maggi",
    subtitle: "Freshly cooked, extra veggies",
    price: 35,
    prepTime: "10–12 min",
    image: require("../../../assets/images/Maggi.png"),
    qty: 1,
  },
  {
    id: "2",
    name: "Cheese Maggi",
    subtitle: "Loaded with cheese",
    price: 45,
    prepTime: "12–15 min",
    image: require("../../../assets/images/Maggi.png"),
    qty: 2,
  },
  {
    id: "3",
    name: "Schezwan Noodles",
    subtitle: "Spicy, Indo Chinese",
    price: 60,
    prepTime: "15–18 min",
    image: require("../../../assets/images/Sandwich.png"),
    qty: 1,
  },
];

const TAX_RATE = 0.05; 
const DELIVERY_FEE = 0; 

const CartScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

  const updateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max(1, item.qty + delta) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + i.price * i.qty, 0),
    [cartItems]
  );

  const tax = useMemo(() => subtotal * TAX_RATE, [subtotal]);
  const total = useMemo(() => subtotal + tax + DELIVERY_FEE, [subtotal, tax]);

  const handleSubmit = () => {
  clearCart();
  navigation.navigate("OrderSuccess");
  setTimeout(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }], 
    });
  }, 2000);
};


const renderItem = ({ item }: { item: CartItem }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => navigation.navigate("FoodDetailsScreen", { item })}
  >
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.info}>
        <View style={styles.rowBetween}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
        </View>

        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.time}>{item.prepTime}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={(e) => {
                e.stopPropagation(); 
                updateQty(item.id, -1);
              }}
            >
              <Text style={styles.qtyText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qtyValue}>{item.qty}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={(e) => {
                e.stopPropagation(); 
                updateQty(item.id, 1);
              }}
            >
              <Text style={styles.qtyText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation(); 
              removeItem(item.id);
            }}
          >
            <Text style={styles.remove}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);



return (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Cart</Text>
      {cartItems.length > 0 && (
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clear}>Clear</Text>
        </TouchableOpacity>
      )}
    </View>

    <FlatList
      data={cartItems}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={{ paddingBottom: 160 }}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
          <Text style={styles.emptySub}>
            Add some tasty snacks to continue!
          </Text>
        </View>
      }
    />

    {cartItems.length > 0 && (
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>₹{subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>GST (5%)</Text>
          <Text style={styles.summaryValue}>₹{tax.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>
            {DELIVERY_FEE === 0 ? "Free" : `₹${DELIVERY_FEE}`}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn} onPress={handleSubmit}>
          <Text style={styles.checkoutText}>
            Submit • ₹{total.toFixed(0)}
          </Text>
        </TouchableOpacity>
      </View>
    )}
  </SafeAreaView>
);
};

export default CartScreen;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4FBF7", paddingHorizontal: 16 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },

  headerTitle: { fontSize: 20, fontWeight: "800" },
  clear: { color: "#FF7A00", fontWeight: "700" },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
  },

  image: { width: 70, height: 70, borderRadius: 10 },

  info: { flex: 1, marginLeft: 10 },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: { fontSize: 14, fontWeight: "700" },
  price: { fontSize: 14, fontWeight: "800" },

  subtitle: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  time: { fontSize: 11, color: "#9CA3AF", marginTop: 2 },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF1E6",
    borderRadius: 10,
    paddingHorizontal: 6,
  },

  qtyBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  qtyText: { fontSize: 18, color: "#FF7A00", fontWeight: "800" },
  qtyValue: { minWidth: 24, textAlign: "center", fontWeight: "700" },

  remove: { fontSize: 12, color: "#EF4444", fontWeight: "600" },

  empty: { alignItems: "center", marginTop: 80 },
  emptyText: { fontSize: 18, fontWeight: "700" },
  emptySub: { fontSize: 13, color: "#9CA3AF", marginTop: 6 },

  summaryContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  summaryLabel: { fontSize: 13, color: "#6B7280" },
  summaryValue: { fontSize: 13, fontWeight: "600" },

  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 8,
  },

  totalLabel: { fontSize: 15, fontWeight: "800" },
  totalValue: { fontSize: 15, fontWeight: "800" },

  checkoutBtn: {
    backgroundColor: "#FF7A00",
    borderRadius: 14,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  checkoutText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
});
