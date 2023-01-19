import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_QUERY } from "@endpoints/products";

const ProductPage = () => {
  const { data } = useQuery({
    ...PRODUCTS_QUERY.getProducts(),
  });

  return <div>{JSON.stringify(data?.data, null, 2)}</div>;
};

export default ProductPage;
