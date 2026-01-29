import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FoodItem } from "../../types/food";
import { SafeAreaView } from "react-native-safe-area-context";

const FoodDetailsScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();

  const {
    item,
    initialQty = 1,
  }: { item: FoodItem; initialQty?: number } = route.params;

  const [qty, setQty] = useState(initialQty);
  const [inCart, setInCart] = useState(initialQty > 0);
  const total = item.price * qty;

  const handleAddToCart = () => {
    setInCart(true);
    setQty(1);
  };

  const incrementQty = () => {
    setInCart(true);
    setQty((q) => q + 1);
  };

  const decrementQty = () => {
    setQty((q) => {
      if (q <= 1) {
        setInCart(false);
        return 1;
      }
      return q - 1;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{item.name}</Text>
      </View>

      <Image source={item.image} style={styles.image} />

      <View style={styles.ratingBadge}>
        <Text>
          ⭐ {item.rating} · {item.totalOrders}+ orders
        </Text>
      </View>

      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>

      <View style={styles.rowBetween}>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>

      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.desc}>{item.description}</Text>

      <Text style={styles.sectionTitle}>Prep time</Text>
      <Text style={styles.prep}>{item.prepTime}</Text>

      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.itemsText}>{qty} item(s)</Text>
          <Text style={styles.total}>₹{total}</Text>
        </View>

        {!inCart ? (
          <TouchableOpacity
            style={styles.addToCartBtn}
            onPress={handleAddToCart}
          >
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtyBox}>
            <TouchableOpacity onPress={decrementQty}>
              <Text style={styles.qtyBtn}>−</Text>
            </TouchableOpacity>

            <Text style={styles.qty}>{qty}</Text>

            <TouchableOpacity onPress={incrementQty}>
              <Text style={styles.qtyBtn}>+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF7",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  back: {
    fontSize: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  image: {
    width: "92%",
    height: 200,
    borderRadius: 14,
    alignSelf: "center",
    marginTop: 8,
  },

  ratingBadge: {
    position: "absolute",
    top: 260,
    left: 30,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    elevation: 3,
  },

  name: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 16,
    paddingHorizontal: 16,
    color: "#111827",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    paddingHorizontal: 16,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
  },

  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 6,
  },
  qtyBtn: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontWeight: "700",
  },
  qty: {
    fontSize: 14,
    fontWeight: "700",
    marginHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 18,
    paddingHorizontal: 16,
    color: "#111827",
  },
  desc: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
    paddingHorizontal: 16,
    lineHeight: 18,
  },

  addonChip: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  addonActive: {
    backgroundColor: "#FFF1E6",
    borderColor: "#FF7A00",
  },

  prep: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 6,
    paddingHorizontal: 16,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  itemsText: {
    fontSize: 12,
    color: "#6B7280",
  },
  total: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 2,
  },

  addToCartBtn: {
    backgroundColor: "#FF7A00",
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});


export default FoodDetailsScreen;
