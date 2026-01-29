import axios from "axios";
import Config from "react-native-config";
import { CreateFoodPayload } from "../types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = Config.BASE_URL;

export const postLogin = async (email: string, password: string) => {
  const url = `${BASE_URL}/auth/login`;
  console.log("Login URL:", url);

  const body = {
    email,
    password,
    role: "vendor",
  };

  try {
    console.log("normal login", body);
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Login Response:", response.data);

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};



export const postCreateFood = async (payload: CreateFoodPayload) => {
  const url = `${BASE_URL}/foods`;
  console.log("Create Food URL:", url);

  const token = await AsyncStorage.getItem("token");

  const body = {
    name: payload.name,
    subtitle: payload.subtitle,
    price: payload.price,
    image: payload.image,
    description: payload.description,
    rating: payload.rating ?? 0,
    totalOrders: payload.totalOrders ?? 0,
    isAvailable: payload.isAvailable ?? true,
  };

  try {
    console.log("Create Food Body:", body);

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    console.log("Create Food Response:", response.data);

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    console.error(
      "Create Food Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
