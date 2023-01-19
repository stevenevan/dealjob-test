export interface iGetCartsResponse {
  carts: iCart[];
  total: number;
  skip: number;
  limit: number;
}

export interface iCart {
  id: number;
  products: iCartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface iCartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}
