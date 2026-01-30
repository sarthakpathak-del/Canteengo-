import axios from "axios";
import Config from "react-native-config";
import { CreateFoodPayload } from "../types/type";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = Config.BASE_URL;

export const postLoginvendor = async (email: string, password: string) => {
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

export const postLogincustomers = async (email: string, password: string) => {
  const url = `${BASE_URL}/auth/login`;
  console.log("Login URL:", url);

  const body = {
    email,
    password,
    role: "customer",
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


export const postCustomerRegisterRequestOtp = async (
  name: string,
  email: string,
  password: string
) => {
  const url = `${BASE_URL}/auth/register/request-otp`;
  console.log("Register Request OTP URL:", url);

  const body = {
    name,
    email,
    password,
    role: "customer", 
  };

  try {
    console.log("Register Request OTP Body:", body);
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Register Request OTP Response:", response.data);

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    console.error(
      "Register Request OTP Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postCustomerRegisterVerifyOtp = async (
  name: string,
  email: string,
  password: string,
  otp: string
) => {
  const url = `${BASE_URL}/auth/register/verify-otp`;
  console.log("Register Verify OTP URL:", url);

  const body = {
    name,
    email,
    password,
    role: "customer",
    otp,
  };

  try {
    console.log("Register Verify OTP Body:", body);
    const response = await axios.post(url, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Register Verify OTP Response:", response.data);

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error: any) {
    console.error(
      "Register Verify OTP Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};


// Add to cart
export const addToCartApi = async (foodId: string, quantity: number) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/cart/add`,
      {
        items: [{ foodId, quantity }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Add to cart error:", error.response?.data || error.message);
    throw error;
  }
};

// Clear cart
export const clearCartApi = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.delete(`${BASE_URL}/cart/clear`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Clear cart error:", error.response?.data || error.message);
    throw error;
  }
};

