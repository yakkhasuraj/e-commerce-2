"use client";

import { CART } from "@/configs";
import { useAuth } from "@/hooks";
import { isEmpty } from "@/utils";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "react-use";

export const CartItems = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useLocalStorage(CART, []);

  const total = cart.reduce(
    (acc, { product, quantity }) => acc + product.price * quantity,
    0
  );

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    console.log("Buy now");
    setCart([]);
  };

  return (
    <>
      {cart.map((item) => (
        <Box
          key={item.product._id}
          className="flex flex-row gap-8 items-center"
        >
          <Avatar
            src={item.product.image}
            className="w-24 h-24"
            variant="square"
          />
          <Typography variant="h6" component="p">
            Quantity: {item.quantity}
          </Typography>
        </Box>
      ))}

      {!isEmpty(cart) && (
        <>
          <Typography variant="h6" component="p">
            Total: {total}
          </Typography>

          <Box>
            <Button
              color="secondary"
              onClick={handleBuyNow}
              variant="contained"
            >
              Buy Now
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
