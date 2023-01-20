import { useQuery } from "@tanstack/react-query";
import { CARTS_QUERY } from "@endpoints/carts";
import { Button, Center, Loader, Text } from "@mantine/core";
import Layout from "@screens/hoc/Layout";
import { DataGrid, numberFilterFn } from "mantine-data-grid";
import Link from "next/link";
import { useLocalStorage } from "@mantine/hooks";
import type {
  ColumnFiltersState,
  PaginationState,
} from "@tanstack/react-table";
import { UserHoverCard } from "@screens/components";

const CartsPage = () => {
  const { data, isLoading } = useQuery({
    ...CARTS_QUERY.getCarts(),
  });
  const [columnFilters, setColumnFilters] = useLocalStorage<ColumnFiltersState>(
    { key: "cart-filters", defaultValue: [] }
  );
  const [pagination, setPagination] = useLocalStorage<PaginationState>({
    key: "cart-pagination",
    defaultValue: { pageIndex: 0, pageSize: 10 },
  });

  if (isLoading || !data?.data?.carts) {
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
        data={data?.data?.carts}
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
            accessorKey: "userId",
            header: "User",
            cell: (cell) => <UserHoverCard userId={cell.getValue<number>()} />,
          },
          {
            accessorKey: "totalProducts",
            header: "Total Products",
            filterFn: numberFilterFn,
          },
          {
            accessorKey: "totalQuantity",
            header: "Total Quantity",
            filterFn: numberFilterFn,
          },
          {
            accessorKey: "total",
            header: "Total",
            filterFn: numberFilterFn,
            cell: (cell) => (
              <>${cell.getValue<number>().toLocaleString("en-US")}</>
            ),
          },
          {
            accessorKey: "discountedTotal",
            header: "Total After Discount",
            filterFn: numberFilterFn,
            cell: (cell) => (
              <>${cell.getValue<number>().toLocaleString("en-US")}</>
            ),
          },
          {
            accessorKey: "id",
            header: "Action",
            cell: (cell) => (
              <Link href={`/carts/${cell.getValue<number>()}`} passHref>
                <Button>Detail</Button>
              </Link>
            ),
          },
        ]}
      />
    </Layout>
  );
};

export default CartsPage;
