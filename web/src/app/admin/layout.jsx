import { AdminSidebar } from "@/common/ui/layouts";
import { AclProvider } from "@/features/acl/components";
import { AuthProvider } from "@/features/auth";
import { Box, CssBaseline } from "@mui/material";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <AclProvider>
          <Box className="flex">
            <CssBaseline />
            <AdminSidebar />

            <Box component="main" className="flex-grow p-6">
              {children}
            </Box>
          </Box>
        </AclProvider>
      </AuthProvider>
    </>
  );
};

export default AdminLayout;
