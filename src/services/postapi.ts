import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "react-native-config";

const BASE_URL = Config.BASE_URL;
export const postUploadImage = async (asset: any) => {
  const url = `${BASE_URL}/upload/image`;
  console.log("Upload Image URL:", url);

  const token = await AsyncStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", {
    uri: asset.uri,
    name: asset.fileName || `photo_${Date.now()}.jpg`,
    type: asset.type || "image/jpeg",
  } as any);

  try {
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    console.log("Upload Image API Response:", response.data);

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    console.error(
      "Upload Image Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
