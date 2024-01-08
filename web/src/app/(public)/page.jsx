import { ProductCard } from "@/common/ui/cards";
import { Pagination } from "@/common/ui/navigation";
import { PRODUCTS } from "@/configs";
import { baseUrl } from "@/configs/env";
import { v1 } from "@/libs/axios";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Suspense } from "react";

const getProductList = async (searchParams) => {
  const { page = 1, pageSize = 12 } = searchParams;
  const res = await fetch(
    `${baseUrl}${v1}/${PRODUCTS}?page=${page}&limit=${pageSize}`,
    { cache: "no-cache" }
  );

  if (!res.ok) {
    throw new Error("Post list fetch failed");
  }

  return res.json();
};

export default async function Home(props) {
  const { results } = await getProductList(props.searchParams);

  return (
    <Box className="flex flex-col gap-4 items-center">
      <Grid container spacing={2}>
        {results.map((product) => (
          <Grid md={4} key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <Suspense fallback="Pagination is loading...">
        <Pagination />
      </Suspense>
    </Box>
  );
}
