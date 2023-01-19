import { useQuery } from "@tanstack/react-query";
import { PRODUCTS_QUERY } from "@endpoints/products";
import { Text, Loader, Center, Grid } from "@mantine/core";
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
import { useMemo } from "react";
import hash from "stable-hash";
import dynamic from "next/dynamic";
import type { AxisOptions } from "react-charts";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

type iChartData = {
  label: string;
  count: number;
};

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

  const itemsBrandDataDict: Record<string, number> = useMemo(() => {
    if (!data?.data?.products) return {};
    return data.data.products.reduce((obj: Record<string, number>, item) => {
      const lowerBrand = item.brand.toLowerCase();
      return Object.assign(obj, { [lowerBrand]: 1 + (obj[lowerBrand] || 0) });
    }, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash(data?.data?.products)]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const primaryAxis: any = useMemo(
    (): AxisOptions<iChartData> => ({
      getValue: (data) => data.label,
    }),
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const secondaryAxes: any = useMemo(
    (): AxisOptions<iChartData>[] => [
      {
        getValue: (data) => data.count,
      },
    ],
    []
  );

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

  const itemsBrandData: iChartData[] = Object.keys(itemsBrandDataDict).map(
    (key) => ({
      label: key,
      count: itemsBrandDataDict[key] || 0,
    })
  );
  const chartData = [{ label: "Number Items of Brands", data: itemsBrandData }];

  return (
    <Layout>
      <Grid>
        <Grid.Col span={12}>
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
              {
                accessorKey: "stock",
                header: "Stock",
                filterFn: numberFilterFn,
              },
              {
                accessorKey: "category",
                header: "Category",
                filterFn: stringFilterFn,
                cell: highlightFilterValue,
              },
            ]}
          />
        </Grid.Col>

        <Grid.Col span={12} mih={400}>
          <Chart
            options={{
              data: chartData,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              primaryAxis,
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              secondaryAxes,
            }}
          />
        </Grid.Col>
      </Grid>
    </Layout>
  );
};

export default ProductPage;
