import { useQuery } from "@tanstack/react-query";
import { CARTS_QUERY } from "@endpoints/carts";
import { Center, Grid, Loader, Stack, Text } from "@mantine/core";
import Layout from "@screens/hoc/Layout";
import { useRouter } from "next/router";
import {
  DataGrid,
  highlightFilterValue,
  numberFilterFn,
  stringFilterFn,
} from "mantine-data-grid";
import DataText from "./DataText";
import { UserHoverCard } from "@screens/components";

const CartsDetailPage = () => {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    ...CARTS_QUERY.getCart(Number(router.query.id)),
    enabled: Boolean(router.query.id),
  });

  if (isLoading || !data?.data) {
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
      <Stack spacing={"lg"}>
        <Grid>
          <DataText title="Cart ID" content={data.data.id.toString()} />
          <DataText
            title="User"
            content={<UserHoverCard userId={data.data.userId} />}
          />
          <DataText
            title="Total Products"
            content={data.data.totalProducts.toLocaleString("en-US")}
          />
          <DataText
            title="Total Quantity"
            content={data.data.totalQuantity.toLocaleString("en-US")}
          />
          <DataText
            title="Total"
            content={`$${data.data.total.toLocaleString("en-US")}`}
          />
          <DataText
            title="Total After Discount"
            content={`$${data.data.discountedTotal.toLocaleString("en-US")}`}
          />
        </Grid>
        <DataGrid
          data={data?.data?.products}
          striped
          highlightOnHover
          withColumnFilters
          withPagination
          withColumnResizing
          columns={[
            {
              accessorKey: "title",
              header: "Product Name",
              filterFn: stringFilterFn,
              cell: highlightFilterValue,
            },
            {
              accessorKey: "quantity",
              header: "Quantity",
              filterFn: numberFilterFn,
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
            {
              accessorKey: "total",
              header: "Total",
              filterFn: numberFilterFn,
              cell: (cell) => (
                <>${cell.getValue<number>().toLocaleString("en-US")}</>
              ),
            },
            {
              accessorKey: "discountedPrice",
              header: "Total After Discount",
              filterFn: numberFilterFn,
              cell: (cell) => (
                <>${cell.getValue<number>().toLocaleString("en-US")}</>
              ),
            },
          ]}
        />
      </Stack>
    </Layout>
  );
};

export default CartsDetailPage;
