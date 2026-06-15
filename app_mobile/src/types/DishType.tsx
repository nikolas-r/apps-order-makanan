export type DishType = {
  id: number;
  rating: number;
  name: string;
  description: string;
  price: number;
  weight: string;
  isAvailable: boolean;
  img: string;
  quantity?: number;
  ingredients?: string[];
};
