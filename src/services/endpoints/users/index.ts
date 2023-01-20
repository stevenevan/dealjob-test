import type { AxiosPromise } from "axios";
import { axiosInstance } from "../../api";
import type { iGetUserResponse } from "./types";

const USERS_QUERY_KEYS = {
  users: () => ["users"],
  user: (id: number) => [...USERS_QUERY_KEYS.users(), id],
};

const USERS_QUERY_URL = {
  user: (id: number) => `/users/${id}`,
};

export const USERS_QUERY = {
  getUser: (id: number) => ({
    queryKey: USERS_QUERY_KEYS.user(id),
    queryFn: (): AxiosPromise<iGetUserResponse> =>
      axiosInstance.get(USERS_QUERY_URL.user(id)),
  }),
};
