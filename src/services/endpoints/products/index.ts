import type { AxiosPromise } from "axios";
import { axiosInstance } from "../../api";
import type { iPaginated } from "@common/types";

const PRODUCTS_QUERY_KEYS = {
  products: () => ["products"],
};

const PRODUCTS_QUERY_URL = `/products/?limit=${1_000_000}`;

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

export type iGetProductsResponse = iPaginated & { products: iProduct[] };

export const PRODUCTS_QUERY = {
  getProducts: () => ({
    queryKey: PRODUCTS_QUERY_KEYS.products(),
    queryFn: (): AxiosPromise<iGetProductsResponse> =>
      axiosInstance.get(PRODUCTS_QUERY_URL),
  }),
};
