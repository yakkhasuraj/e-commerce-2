import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

const pages = ["Products", "About us", "Contact us"];

export const Navbar = () => {
  return (
    <AppBar position="static" className="mb-2">
      <Toolbar className="flex justify-between">
        <Box className="flex justify-between gap-4">
          <Typography variant="h6" component="h1">
            E-commerce
          </Typography>

          <Box>
            {pages.map((page) => (
              <Button key={page} variant="text" color="secondary">
                {page}
              </Button>
            ))}
          </Box>
        </Box>

        <Link href="/auth/login">
          <Button variant="outlined" color="secondary">
            Login
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
