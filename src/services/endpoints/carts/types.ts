import type { iPaginated } from "@common/types";

export type iGetCartsResponse = iPaginated & {
  carts: iCart[];
};

export type iGetCartResponse = iCart;

export type iCart = {
  id: number;
  products: iCartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
};

export type iCartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
};
