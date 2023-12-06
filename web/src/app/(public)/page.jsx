import { ProductCard } from "@/common/ui/cards";
import { PRODUCTS } from "@/data";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

export default function Home() {
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
