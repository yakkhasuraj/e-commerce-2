import { ProductCard } from "@/common/ui/cards";
import { Pagination } from "@/common/ui/navigation";
import { PRODUCTS } from "@/data";
import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Suspense } from "react";

const getPostList = async (searchParams) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Post list fetch failed");
  }

  return res.json();
};

export default async function Home(props) {
  console.log("Props", props);
  // const postListData = await getPostList(props.searchParams);

  return (
    <Box className="flex flex-col gap-4 items-center">
      <Grid container spacing={2}>
        {PRODUCTS.map((product) => (
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
