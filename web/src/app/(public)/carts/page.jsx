import { CartItems } from "@/features/carts";
import { Box, Typography } from "@mui/material";

const CartListPage = () => {
  return (
    <Box className="flex flex-col gap-4">
      <Typography variant="h4" component="p">
        Cart List
      </Typography>

      <CartItems />
    </Box>
  );
};

export default CartListPage;
