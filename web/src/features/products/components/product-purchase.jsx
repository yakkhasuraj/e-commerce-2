"use client";

import { useAuth } from "@/hooks";
import { Button, ButtonGroup } from "@mui/material";
import { useRouter } from "next/navigation";
import { MdAddShoppingCart } from "react-icons/md";

export const ProductPurchase = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleBuyNow = () => {
    if (isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    console.log("Buy now");
  };

  return (
    <ButtonGroup
      variant="contained"
      fullWidth
      className="flex flex-row gap-2 justify-center"
      disableElevation
    >
      <Button color="primary" startIcon={<MdAddShoppingCart />}>
        Add To Cart
      </Button>
      <Button color="secondary" onClick={handleBuyNow}>
        Buy Now
      </Button>
    </ButtonGroup>
  );
};
