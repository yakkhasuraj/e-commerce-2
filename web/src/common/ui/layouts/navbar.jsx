import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

const pages = [
  { name: "Products", path: "/" },
  { name: "About us", path: "/about-us" },
  { name: "Contact us", path: "/contact-us" },
  { name: "Carts", path: "/carts" },
];

export const Navbar = () => {
  return (
    <AppBar position="static" className="mb-2">
      <Toolbar className="flex justify-between">
        <Box className="flex justify-between gap-4">
          <Typography variant="h6" component="h1">
            E-commerce
          </Typography>

          <Box>
            {pages.map(({ name, path }) => (
              <Link href={path} key={name}>
                <Button variant="text" color="secondary">
                  {name}
                </Button>
              </Link>
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
