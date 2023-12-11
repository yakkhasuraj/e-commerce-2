"use client";

import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState } from "react";
import { HiMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { ProductPurchase } from "./product-purchase";

export const QuantitySelector = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleToggle = (_, value) => {
    let newQuantity = 0;
    if (value === "plus") newQuantity = quantity + 1;
    if (value === "minus") {
      newQuantity = quantity - 1;
      if (quantity === 0) newQuantity = 0;
    }
    setQuantity(newQuantity);
  };

  return (
    <Box className="flex flex-col gap-4">
      <ToggleButtonGroup exclusive onChange={handleToggle}>
        <ToggleButton value="plus" className="rounded-s-full border-r-0">
          <HiOutlinePlusSm />
        </ToggleButton>

        <ToggleButton value="quantity" disabled className="border-r-0 w-12">
          {quantity}
        </ToggleButton>

        <ToggleButton value="minus" className="rounded-e-full border-l-0">
          <HiMinusSm />
        </ToggleButton>
      </ToggleButtonGroup>

      <ProductPurchase product={product} quantity={quantity} />
    </Box>
  );
};
