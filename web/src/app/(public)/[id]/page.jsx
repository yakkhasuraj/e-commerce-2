import { PRODUCTS } from "@/configs";
import { baseUrl } from "@/configs/env";
import { QuantitySelector } from "@/features/products";
import { v1 } from "@/libs/axios";
import {
  Avatar,
  Box,
  ButtonGroup,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";
import { LiaFacebookMessenger, LiaWhatsapp } from "react-icons/lia";

const getProduct = async (id) => {
  const res = await fetch(
    `${baseUrl}${v1}/${PRODUCTS}/${id}?populate=category&populate=`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Post fetch failed");
  }

  return res.json();
};

const ProductDetailPage = async (props) => {
  const { result } = await getProduct(props.params.id);

  return (
    <Grid container spacing={2}>
      <Grid md={4} className="flex flex-col gap-2">
        <Box className="flex flex-row gap-2">
          <Image
            src={result.image}
            alt={result.name}
            className="w-24 h-24"
            width={100}
            height={100}
            variant="square"
          />
          <Image
            src={result.image}
            alt={result.name}
            className="w-96 h-96"
            width={100}
            height={100}
            variant="square"
          />
        </Box>
      </Grid>

      <Grid md={8} className="flex flex-col gap-4">
        <Typography variant="h6" color="primary">
          {result.category.name}
        </Typography>
        <Divider />
        <Box className="flex flex-col gap-2">
          <Typography variant="h6">{result.name}</Typography>
          <Typography variant="body1">Rs {result.price}</Typography>
        </Box>
        <Divider />
        <Box className="flex flex-col gap-2">
          <Typography variant="h6">Quantity</Typography>
          <QuantitySelector product={result} />
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
        <Typography variant="body1">{result.description}</Typography>
      </Grid>
    </Grid>
  );
};

export default ProductDetailPage;
