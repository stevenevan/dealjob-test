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
import type {
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import { useLocalStorage } from "@mantine/hooks";

const ProductPage = () => {
  const { data, isLoading } = useQuery({
    ...PRODUCTS_QUERY.getProducts(),
  });
  const [columnFilters, setColumnFilters] = useLocalStorage<ColumnFiltersState>(
    { key: "products-filters", defaultValue: [] }
  );
  const [pagination, setPagination] = useLocalStorage<PaginationState>({
    key: "products-pagination",
    defaultValue: { pageIndex: 0, pageSize: 10 },
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

  return (
    <Layout>
      <DataGrid
        data={data?.data?.products}
        onFilter={setColumnFilters}
        state={{
          columnFilters,
          pagination,
        }}
        onPageChange={setPagination}
        striped
        highlightOnHover
        withPagination
        withColumnFilters
        withColumnResizing
        columns={[
          {
            accessorKey: "title",
            header: "Product Name",
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
