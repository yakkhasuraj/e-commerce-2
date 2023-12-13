"use client";

import { TablePagination } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Pagination = () => {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const page = search.get("page") ?? 1;
  const pageSize = search.get("pageSize") ?? 12;

  const handlePageChange = (_, value) => {
    router.push(`${pathname}?page=${value + 1}&pageSize=${pageSize}`);
  };

  const handlePageSizeChange = (event) => {
    const { value } = event.target;
    router.push(`${pathname}?page=${page}&pageSize=${value}`);
  };

  return (
    <TablePagination
      component="div"
      count={1000}
      color="primary"
      page={parseInt(page) - 1}
      onPageChange={handlePageChange}
      rowsPerPage={parseInt(pageSize)}
      rowsPerPageOptions={[12, 24, 48, 96]}
      onRowsPerPageChange={handlePageSizeChange}
      showFirstButton
      showLastButton
    />
  );
};
