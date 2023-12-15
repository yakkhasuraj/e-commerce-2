"use client";

import { PRODUCTS } from "@/data";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** @type {import('@mui/x-data-grid').GridColDef[]} */
const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 200,
    renderCell: ({ row, value }) => (
      <Link href={`/admin/products/${row._id}`}>{value}</Link>
    ),
  },
  {
    field: "description",
    headerName: "Description",
    width: 250,
    renderCell: ({ value }) => <Typography variant="body1">{value}</Typography>,
  },
  { field: "price", headerName: "Price" },
  { field: "quantity", headerName: "Quantity" },
  { field: "rating", headerName: "Rating" },
];

const ProductListPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const page = search.get("page") ?? 1;
  const pageSize = search.get("pageSize") ?? 12;

  const handlePagination = ({ page, pageSize }) => {
    router.push(`${pathname}?page=${page + 1}&pageSize=${pageSize}`);
  };

  return (
    <Box className="flex flex-col gap-4">
      <Box className="flex flex-row justify-between">
        <Typography variant="h4" component="h1">
          Products List
        </Typography>

        <Link href="/admin/products/add">
          <Button variant="contained" color="primary">
            Add Product
          </Button>
        </Link>
      </Box>

      <DataGrid
        rows={PRODUCTS}
        columns={columns}
        getRowId={(row) => row._id}
        rowCount={1000}
        pageSizeOptions={[12, 24, 48, 96]}
        paginationModel={{
          page: parseInt(page) - 1,
          pageSize: parseInt(pageSize),
        }}
        paginationMode="server"
        onPaginationModelChange={handlePagination}
      />
    </Box>
  );
};

export default ProductListPage;
