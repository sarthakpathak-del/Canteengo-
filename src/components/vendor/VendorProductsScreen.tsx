import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getproducts } from "../../services/dataprovider";


type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  isAvailable: boolean;
};

const VendorProductsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.refresh) {
        fetchProducts();
        navigation.setParams({ refresh: false });
      } else {
        fetchProducts();
      }
    }, [route.params])
  );

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getproducts();
      console.log("📦 Products API:", res);

      setProducts(res.foods || []);
    } catch (err) {
      console.error("❌ Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Product }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("VendorAddEditProduct", { product: item })
        }
      >
        <View style={styles.card}>
          <View style={styles.left}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.sub}>
              {item.description} ₹{item.price}
            </Text>
          </View>

          <View
            style={[
              styles.statusPill,
              item.isAvailable
                ? styles.inStock
                : styles.outOfStock,
            ]}
          >
            <Text
              style={[
                styles.statusText,
                item.isAvailable
                  ? styles.inStockText
                  : styles.outOfStockText,
              ]}
            >
              {item.isAvailable ? "In stock" : "Out of stock"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }



  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Products</Text>
          <Text style={styles.subtitle}>Manage snack items</Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() =>
            navigation.navigate("VendorAddEditProduct" as never)
          }
        >
          <Text style={styles.addIcon}>＋</Text>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Empty State */}
      {products.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No products found
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={fetchProducts}
        />
      )}
    </SafeAreaView>
  );
};


export default VendorProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF7",
  },

  header: {
    backgroundColor: "#ECFEF3",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#D1FAE5",
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },

  addIcon: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginRight: 4,
  },

  addText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },

  listContent: {
    padding: 16,
    gap: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  left: {
    flex: 1,
    paddingRight: 10,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  sub: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 4,
  },

  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  inStock: {
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#86EFAC",
  },

  outOfStock: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  inStockText: {
    color: "#166534",
  },

  outOfStockText: {
    color: "#991B1B",
  },
});
