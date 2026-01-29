import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "react-native-config";

const BASE_URL = Config.BASE_URL;

export const getproducts = async () => {
  const url = `${BASE_URL}/foods`;

  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("❌ getproducts error:", error.response?.data || error.message);
    throw error;
  }
};

export const putUpdateFood = async (foodId: string, payload: any) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.put(
      `${BASE_URL}/foods/${foodId}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("❌ Update food API error:", error.response?.data || error);
    throw error;
  }
};


export const deleteFoodById = async (foodId: string) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const response = await axios.delete(
      `${BASE_URL}/foods/${foodId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("❌ Delete food API error:", error.response?.data || error);
    throw error;
  }
};
