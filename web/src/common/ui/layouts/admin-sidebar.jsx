import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import Link from "next/link";

const sidebarItems = [
  {
    name: "Products",
    href: "/admin/products",
    icon: <MdProductionQuantityLimits />,
  },
  { name: "Categories", href: "/admin/categories", icon: <BiCategory /> },
];

export const AdminSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      className="w-60"
      ModalProps={{
        keepMounted: false,
      }}
    >
      <Toolbar />

      <Divider />

      <List>
        {sidebarItems.map(({ name, href, icon }) => (
          <ListItem key={href} disablePadding>
            <Link href={href}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
