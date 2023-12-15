import { AdminSidebar } from "@/common/ui/layouts";
import { AuthProvider } from "@/features/auth";
import { Box, CssBaseline } from "@mui/material";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AuthProvider>
        <Box className="flex">
          <CssBaseline />
          <AdminSidebar />

          <Box component="main" className="flex-grow p-6">
            {children}
          </Box>
        </Box>
      </AuthProvider>
    </>
  );
};

export default AdminLayout;
