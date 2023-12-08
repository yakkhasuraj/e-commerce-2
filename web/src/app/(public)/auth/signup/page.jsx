import { Signup } from "@/features/auth";
import { Box, Typography } from "@mui/material";

const SingupPage = () => {
  return (
    <Box className="flex flex-col justify-center items-center h-[90vh]">
      <Typography variant="h1">Singup</Typography>
      <Signup />
    </Box>
  );
};

export default SingupPage;
