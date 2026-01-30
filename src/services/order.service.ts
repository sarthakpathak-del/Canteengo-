import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "react-native-config";

const BASE_URL = Config.BASE_URL;

export const placeOrderApi = async (items: any[], totalPrice: number) => {
  const token = await AsyncStorage.getItem("token");

  const res = await axios.post(
    `${BASE_URL}/orders/place`,   
    { items, totalPrice },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const updateOrderStatusApi = async (
  orderId: string,
  status: "Accepted" | "Rejected"
) => {
  const token = await AsyncStorage.getItem("token");

  const res = await axios.put(
    `${BASE_URL}/orders/${orderId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
