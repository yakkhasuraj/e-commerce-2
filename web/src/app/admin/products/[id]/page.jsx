"use client";

import { createRandomProducts } from "@/data";
import { ProductEntry, useProduct } from "@/features/products";
import { isMongoId } from "@/utils";
import { Box, Typography } from "@mui/material";
import { useParams } from "next/navigation";

const ProductEntryPage = () => {
  const params = useParams();
  const id = params.id;

  const edit = isMongoId(id);

  const { data } = useProduct(edit, id);

  return (
    <Box className="flex flex-col gap-4">
      <Typography variant="h4" component="h1">
        {edit ? "Edit" : "Add"} Product
      </Typography>

      <ProductEntry edit={edit} data={data?.result} />
    </Box>
  );
};

export default ProductEntryPage;
