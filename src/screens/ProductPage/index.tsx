import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_QUERY } from "@endpoints/products";
import { Text } from "@mantine/core";
import Layout from "@screens/hoc/Layout";

const ProductPage = () => {
  const { data, isLoading } = useQuery({
    ...PRODUCTS_QUERY.getProducts(),
  });

  // TODO: Add loading state
  // TODO: Add error state

  return (
    <Layout>
      <Text>{JSON.stringify(data?.data, null, 2)}</Text>
    </Layout>
  );
};

export default ProductPage;
