import { Navbar } from "@/common/ui/layouts";
import { AuthProvider } from "@/features/auth";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <AuthProvider>{children}</AuthProvider>
    </>
  );
};

export default PrivateLayout;
