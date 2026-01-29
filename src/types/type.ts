export type CreateFoodPayload = {
  name: string;
  subtitle: string;
  price: number;
  image: string;
  description: string;
  rating?: number;
  totalOrders?: number;
  isAvailable?: boolean;
};
