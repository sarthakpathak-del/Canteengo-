import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Switch,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { postCreateFood } from "../../services/auth";
import { launchImageLibrary } from "react-native-image-picker";
import { postUploadImage } from "../../services/postapi";
import { deleteFoodById, putUpdateFood } from "../../services/dataprovider";


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


const VendorAddEditProductScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const editingProduct = route.params?.product;

  const [name, setName] = useState(editingProduct?.name || "");
  const [price, setPrice] = useState(
    editingProduct?.price?.toString() || ""
  );
  const [category, setCategory] = useState(
    editingProduct?.category || "Snacks"
  );
  const [inStock, setInStock] = useState(
    editingProduct?.isAvailable ?? true
  );
  const [imageUri, setImageUri] = useState<string | null>(
    editingProduct?.image || null
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const isEdit = !!editingProduct;

  const handleSave = async () => {
    if (!name || !price) {
      Alert.alert("Validation", "Please enter product name and price");
      return;
    }

    const payload = {
      name,
      subtitle: category,
      price: Number(price),
      image: imageUri || "https://via.placeholder.com/300",
      description: `${name} from ${category}`,
      rating: editingProduct?.rating || 0,
      totalOrders: editingProduct?.totalOrders || 0,
      isAvailable: inStock,
    };
    console.log("Payload to save:", payload);
    try {
      setLoading(true);

      if (isEdit) {
        console.log("UPDATE", payload);
        await putUpdateFood(editingProduct._id, payload);
        Alert.alert("Success", "Product updated successfully");
      } else {
        console.log("CREATE", payload);
        await postCreateFood(payload);
        Alert.alert("Success", "Product created successfully");
      }


      setLoading(false);
navigation.goBack();

    } catch (error: any) {
      setLoading(false);
      console.error("Save product error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to save product"
      );
    }
  };


const handleDelete = async () => {
  if (!editingProduct?._id) return;

  Alert.alert(
    "Delete Product",
    "Are you sure you want to delete this product?",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await deleteFoodById(editingProduct._id);
            setLoading(false);
            Alert.alert("Deleted", "Product deleted successfully");

            navigation.goBack();

          } catch (error: any) {
            setLoading(false);
            console.error("Delete product error:", error);
            Alert.alert(
              "Error",
              error.response?.data?.message || "Failed to delete product"
            );
          }
        },
      },
    ]
  );
};


  const handlePickImage = async () => {
    launchImageLibrary(
      {
        mediaType: "photo",
        quality: 0.8,
      },
      async (response) => {
        if (response.didCancel) return;
        if (response.errorMessage) {
          Alert.alert("Error", response.errorMessage);
          return;
        }

        const asset = response.assets?.[0];
        if (!asset?.uri) return;

        try {
          setUploadingImage(true);

          // Upload to server
          const uploadRes = await postUploadImage(asset);
          console.log("Image Upload Response:", uploadRes);

          setImageUri(uploadRes.data.url);

          setUploadingImage(false);
        } catch (err) {
          setUploadingImage(false);
          console.error("Image upload failed:", err);
          Alert.alert("Error", "Image upload failed");
        }
      }
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
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

          <View style={styles.form}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Eg. Veg Samosa (2 pcs)"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Price (₹)</Text>
            <TextInput
              style={styles.input}
              placeholder="20"
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />

            <Text style={styles.label}>Category</Text>
            <TouchableOpacity style={styles.select}>
              <Text style={styles.selectText}>{category}</Text>
              <Text style={styles.chevron}>⌄</Text>
            </TouchableOpacity>

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

            <Text style={styles.label}>Image (optional)</Text>
            <TouchableOpacity style={styles.imageBox} onPress={handlePickImage}>
              {uploadingImage ? (
                <ActivityIndicator />
              ) : imageUri ? (
                <Image
                  source={{ uri: imageUri }}
                  style={{ width: 100, height: 100, borderRadius: 8 }}
                />
              ) : (
                <>
                  <Text style={styles.imageIcon}>🖼️</Text>
                  <Text style={styles.imageText}>Tap to add photo</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.saveText}>Save product</Text>
              )}
            </TouchableOpacity>

            {isEdit && (
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={handleDelete}
              >
                <Text style={styles.deleteText}>Delete product</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
