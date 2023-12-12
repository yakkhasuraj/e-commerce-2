"use client";

import { CART } from "@/configs";
import { useAuth } from "@/hooks";
import { isEmpty } from "@/utils";
import { Button, ButtonGroup } from "@mui/material";
import { useRouter } from "next/navigation";
import { MdAddShoppingCart } from "react-icons/md";
import { useLocalStorage } from "react-use";

export const ProductPurchase = ({ product, quantity }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useLocalStorage(CART);
  const router = useRouter();

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    console.log("Buy now");
  };

  const handleAddToCart = () => {
    if (isEmpty(cart)) {
      setCart([{ product, quantity }]);
      return;
    }

    setCart(cart.concat({ product, quantity }));
  };

  return (
    <ButtonGroup
      variant="contained"
      fullWidth
      className="flex flex-row gap-2 justify-center"
      disableElevation
    >
      <Button
        color="primary"
        startIcon={<MdAddShoppingCart />}
        onClick={handleAddToCart}
      >
        Add To Cart
      </Button>
      <Button color="secondary" onClick={handleBuyNow}>
        Buy Now
      </Button>
    </ButtonGroup>
  );
};
