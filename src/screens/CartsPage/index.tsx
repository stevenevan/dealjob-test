import { useQuery } from "@tanstack/react-query";
import { CARTS_QUERY } from "@endpoints/carts";
import { Button, Center, Loader, Text } from "@mantine/core";
import Layout from "@screens/hoc/Layout";
import { DataGrid, numberFilterFn } from "mantine-data-grid";
import Link from "next/link";

const CartsPage = () => {
  const { data, isLoading } = useQuery({
    ...CARTS_QUERY.getCarts(),
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
  // TODO: Use async data
  return (
    <Layout>
      <DataGrid
        data={data?.data?.carts}
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
            size: 48,
          },
          // TODO: Change userId into username
          {
            accessorKey: "userId",
            header: "User",
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
            header: "Discounted Total",
            filterFn: numberFilterFn,
            cell: (cell) => (
              <>${cell.getValue<number>().toLocaleString("en-US")}</>
            ),
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
