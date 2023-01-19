import type { AxiosPromise } from "axios";
import { axiosInstance } from "../../api";
import type { iGetCartsResponse, iGetCartResponse } from "./types";

const CARTS_QUERY_KEYS = {
  carts: () => ["carts"],
  cart: (id: number) => [...CARTS_QUERY_KEYS.carts(), id],
};

const CARTS_QUERY_URL = {
  carts: `/carts/?limit=${1_000_000}`,
  cart: (id: number) => `/carts/${id}/`,
};

export const CARTS_QUERY = {
  getCarts: () => ({
    queryKey: CARTS_QUERY_KEYS.carts(),
    queryFn: (): AxiosPromise<iGetCartsResponse> =>
      axiosInstance.get(CARTS_QUERY_URL.carts),
  }),
  getCart: (id: number) => ({
    queryKey: CARTS_QUERY_KEYS.cart(id),
    queryFn: (): AxiosPromise<iGetCartResponse> =>
      axiosInstance.get(CARTS_QUERY_URL.cart(id)),
  }),
};
