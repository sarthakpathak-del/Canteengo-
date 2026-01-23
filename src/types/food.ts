export type FoodItem = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: any;

  rating: number;
  totalOrders: number;
  description: string;
  prepTime: string;

  addons: {
    id: string;
    name: string;
    price: number;
  }[];
};
