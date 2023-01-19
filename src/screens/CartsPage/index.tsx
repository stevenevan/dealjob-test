import { useQuery } from "@tanstack/react-query";
import { CARTS_QUERY } from "@endpoints/carts";

const CartsPage = () => {
  const { data } = useQuery({
    ...CARTS_QUERY.getCarts(),
  });

  return <div>{JSON.stringify(data?.data, null, 2)}</div>;
};

export default CartsPage;
