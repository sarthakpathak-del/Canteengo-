import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, FlatList, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderBar from "../../components/HeaderBar";
import { SearchBar } from "react-native-screens";
import PopularSection from "../../components/PopularSection";
import { getproducts } from "../../services/dataprovider";
import { addToCartApi, clearCartApi } from "../../services/auth";

export type FoodItemBase = {
  _id: string;
  name: string;
  subtitle?: string;
  description?: string;
  price: number;
  image?: string;
  isAvailable: boolean;
};

type HomeScreenProps = {
  goToCart: () => void;

};

const HomeScreen: React.FC<HomeScreenProps> = ({ goToCart }) => {
  const [foods, setFoods] = useState<FoodItemBase[]>([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<Record<string, number>>({});

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const res = await getproducts();
      console.log("Products API:", res);
      setFoods(res.foods || []);

    } catch (err) {
      console.error("❌ Failed to load foods", err);
      setFoods([]); 
    } finally {
      setLoading(false);
    }
  };


const handleAdd = async (item: FoodItemBase) => {
  setCart((prev) => ({
    ...prev,
    [item._id]: (prev[item._id] || 0) + 1,
  }));

  try {
    await addToCartApi(item._id, 1);
  } catch (err) {
    console.error("❌ Add to cart failed", err);
  }
};


  const handleRemove = async (item: FoodItemBase) => {
  setCart((prev) => {
    const updated = { ...prev };

    if (!updated[item._id] || updated[item._id] <= 1) {
      delete updated[item._id];

      clearCartApi().catch((err) =>
        console.error("❌ Clear cart failed", err)
      );
    } else {
      updated[item._id] -= 1;
    }

    return updated;
  });
};


  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  const totalAmount = (foods || []).reduce((sum, item) => {
    const qty = cart[item._id] || 0;
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

            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              <PopularSection
                data={foods}
                cart={cart}
                onAdd={handleAdd}
                onRemove={handleRemove}
              />
            )}
          </>
        }
      />

      {totalItems > 0 && (
        <View style={styles.viewCartBar}>
          <View>
            <Text style={styles.viewCartItems}>
              {totalItems} item(s)
            </Text>
            <Text style={styles.viewCartTotal}>₹{totalAmount}</Text>
          </View>

          <TouchableOpacity style={styles.viewCartBtn} onPress={goToCart}>
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
