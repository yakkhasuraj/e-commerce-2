import { createRandomProducts } from "@/data";
import { QuantitySelector } from "@/features/products";
import {
  Avatar,
  Box,
  ButtonGroup,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { LiaFacebookMessenger, LiaWhatsapp } from "react-icons/lia";

const ProductDetailPage = () => {
  const product = createRandomProducts();

  return (
    <Grid container spacing={2}>
      <Grid md={4} className="flex flex-col gap-2">
        <Box className="flex flex-row gap-2">
          <Avatar src={product.image} className="w-24 h-24" variant="square" />
          <Avatar src={product.image} className="w-96 h-96" variant="square" />
        </Box>
      </Grid>

      <Grid md={8} className="flex flex-col gap-4">
        <Typography variant="h6" color="primary">
          {product.category}
        </Typography>
        <Divider />
        <Box className="flex flex-col gap-2">
          <Typography variant="h6">{product.name}</Typography>
          <Typography variant="body1">Rs {product.price}</Typography>
        </Box>
        <Divider />
        <Box className="flex flex-col gap-2">
          <Typography variant="h6">Quantity</Typography>
          <QuantitySelector product={product} />
        </Box>
        <Divider />
        <Box className="flex flex-col gap-2">
          <Typography variant="body1" color="primary">
            Share:
          </Typography>
          <ButtonGroup variant="contained" fullWidth disableElevation>
            <IconButton color="primary">
              <LiaFacebookMessenger />
            </IconButton>
            <IconButton color="secondary">
              <LiaWhatsapp />
            </IconButton>
          </ButtonGroup>
        </Box>
        <Typography variant="h6">Product details</Typography>
        <Divider />
        <Typography variant="body1">{product.description}</Typography>
      </Grid>
    </Grid>
  );
};

export default ProductDetailPage;
