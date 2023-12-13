import { ProductCard } from "@/common/ui/cards";
import { PRODUCTS } from "@/data";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const getPostList = async (searchParams) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Post list fetch failed");
  }

  return res.json();
};

export default async function Home(props) {
  const postListData = await getPostList(props.searchParams);

  return (
    <Grid container spacing={2}>
      {PRODUCTS.map((product) => (
        <Grid md={4} key={product._id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
