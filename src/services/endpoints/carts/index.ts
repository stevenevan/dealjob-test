import type { AxiosPromise } from "axios";
import { axiosInstance } from "../../api";
import type { iGetCartsResponse } from "./types";

const CARTS_QUERY_KEYS = {
  carts: ["carts"],
};

const CARTS_QUERY_URL = `/carts/?limit=${1_000_000}`;

export const CARTS_QUERY = {
  getCarts: () => ({
    queryKey: CARTS_QUERY_KEYS.carts,
    queryFn: (): AxiosPromise<iGetCartsResponse> =>
      axiosInstance.get(CARTS_QUERY_URL),
  }),
};
