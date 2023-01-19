import type { AxiosPromise } from "axios";
import { axiosInstance } from "../../api";

const PRODUCTS_QUERY_KEYS = {
  products: ["products"],
};

const PRODUCTS_QUERY_URL = "/products/";

export type iProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};

export type iGetProductsResponse = iProduct;

export const PRODUCTS_QUERY = {
  getProducts: () => ({
    queryKey: PRODUCTS_QUERY_KEYS.products,
    queryFn: (): AxiosPromise<iGetProductsResponse[]> =>
      axiosInstance.get(PRODUCTS_QUERY_URL),
  }),
};
