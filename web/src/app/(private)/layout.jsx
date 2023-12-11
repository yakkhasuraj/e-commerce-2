import { Navbar } from "@/common/ui/layouts";
import { AuthProvider } from "@/features/auth";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <AuthProvider>{children}</AuthProvider>

      <ToastContainer position="bottom-right" draggable={false} limit={3} />
    </>
  );
};

export default PublicLayout;
