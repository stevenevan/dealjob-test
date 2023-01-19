import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_QUERY } from "@endpoints/products";
import { Text, Loader, Center } from "@mantine/core";
import Layout from "@screens/hoc/Layout";
import {
  DataGrid,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from "mantine-data-grid";

const ProductPage = () => {
  const { data, isLoading } = useQuery({
    ...PRODUCTS_QUERY.getProducts(),
  });

  if (isLoading || !data?.data?.products) {
    return (
      <Layout>
        <Center style={{ height: "100%", flexDirection: "column" }}>
          <Loader variant="dots" />
          <Text>Loading your data...</Text>
        </Center>
      </Layout>
    );
  }

  // TODO: Use async data
  // TODO: Add indicator for autosaved filter
  // TODO: Add autosaved filter feature
  return (
    <Layout>
      <DataGrid
        data={data?.data?.products}
        striped
        highlightOnHover
        withPagination
        withColumnFilters
        withSorting
        withColumnResizing
        columns={[
          {
            accessorKey: "id",
            header: "No",
            size: 32,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "title",
            header: "Title",
            filterFn: stringFilterFn,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "brand",
            header: "Brand",
            filterFn: stringFilterFn,
            cell: highlightFilterValue,
          },
          {
            accessorKey: "price",
            header: "Price",
            filterFn: numberFilterFn,
            cell: (cell) => (
              <>${cell.getValue<number>().toLocaleString("en-US")}</>
            ),
          },
          { accessorKey: "stock", header: "Stock", filterFn: numberFilterFn },
          {
            accessorKey: "category",
            header: "Category",
            filterFn: stringFilterFn,
            cell: highlightFilterValue,
          },
        ]}
      />
    </Layout>
  );
};

export default ProductPage;
