import { Login } from "@/features/auth";
import { Box, Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <Box className="flex flex-col justify-center items-center h-[90vh]">
      <Typography variant="h1">Login</Typography>
      <Login />
    </Box>
  );
};

export default LoginPage;
