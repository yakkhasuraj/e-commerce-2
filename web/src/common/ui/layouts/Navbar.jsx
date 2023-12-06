import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const pages = ["Products", "About us", "Contact us"];

export const Navbar = () => {
  return (
    <AppBar position="static" className="mb-2">
      <Toolbar className="flex justify-between">
        <Box className="flex justify-between">
          <Typography variant="h6" component="h1" className="mr-2">
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

        <Button variant="outlined" color="secondary">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};
