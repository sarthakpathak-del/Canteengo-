import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  
  Switch,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

type Product = {
  id?: string;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
  image?: string;
};

type RouteParams = {
  params?: {
    product?: Product;
  };
};

const CATEGORIES = ["Snacks", "Maggi", "Cold Drink", "Beverages"];

const VendorAddEditProductScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, "params">>();

  const editingProduct = route.params?.product;

  const [name, setName] = useState(editingProduct?.name || "");
  const [price, setPrice] = useState(
    editingProduct?.price?.toString() || ""
  );
  const [category, setCategory] = useState(
    editingProduct?.category || "Snacks"
  );
  const [inStock, setInStock] = useState(
    editingProduct?.inStock ?? true
  );

  const isEdit = !!editingProduct;

  const handleSave = () => {
    const payload: Product = {
      id: editingProduct?.id,
      name,
      price: Number(price),
      category,
      inStock,
    };

    console.log(isEdit ? "UPDATE" : "CREATE", payload);

    // TODO: Call API here

    navigation.goBack();
  };

  const handleDelete = () => {
    if (!editingProduct?.id) return;

    console.log("DELETE", editingProduct.id);

    // TODO: Call delete API

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>
            {isEdit ? "Edit product" : "Add product"}
          </Text>
          <Text style={styles.subtitle}>Few simple fields only</Text>
        </View>
      </View>

      {/* Form */}
      <View style={styles.form}>
        {/* Name */}
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Eg. Veg Samosa (2 pcs)"
          value={name}
          onChangeText={setName}
        />

        {/* Price */}
        <Text style={styles.label}>Price (₹)</Text>
        <TextInput
          style={styles.input}
          placeholder="20"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <TouchableOpacity style={styles.select}>
          <Text style={styles.selectText}>{category}</Text>
          <Text style={styles.chevron}>⌄</Text>
        </TouchableOpacity>

        {/* Availability */}
        <Text style={styles.label}>Availability</Text>
        <View style={styles.availabilityRow}>
          <Text style={styles.availabilityText}>
            {inStock ? "In stock" : "Out of stock"}
          </Text>

          <Switch
            value={inStock}
            onValueChange={setInStock}
            trackColor={{ false: "#E5E7EB", true: "#86EFAC" }}
            thumbColor={inStock ? "#16A34A" : "#9CA3AF"}
          />
        </View>

        {/* Image */}
        <Text style={styles.label}>Image (optional)</Text>
        <TouchableOpacity style={styles.imageBox}>
          <Text style={styles.imageIcon}>🖼️</Text>
          <Text style={styles.imageText}>Tap to add photo</Text>
        </TouchableOpacity>

        {/* Save */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save product</Text>
        </TouchableOpacity>

        {/* Delete (only for edit) */}
        {isEdit && (
          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={handleDelete}
          >
            <Text style={styles.deleteText}>Delete product</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VendorAddEditProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4FBF7",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#D1FAE5",
    gap: 10,
  },

  back: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },

  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },

  form: {
    padding: 16,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 16,
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontSize: 15,
  },

  select: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectText: {
    fontSize: 15,
    color: "#0F172A",
  },

  chevron: {
    fontSize: 16,
    color: "#64748B",
  },

  availabilityRow: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  availabilityText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },

  imageBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    gap: 6,
  },

  imageIcon: {
    fontSize: 22,
  },

  imageText: {
    fontSize: 14,
    color: "#64748B",
  },

  saveBtn: {
    backgroundColor: "#16A34A",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  deleteBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  deleteText: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "700",
  },
});
