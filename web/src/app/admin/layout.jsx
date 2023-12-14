import { AuthProvider } from "@/features/auth";

const AdminLayout = ({ children }) => {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
};

export default AdminLayout;
