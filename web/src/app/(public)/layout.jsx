import { Navbar } from "@/common/ui/layouts";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      {children}

      <ToastContainer position="bottom-right" draggable={false} limit={3} />
    </>
  );
};

export default PublicLayout;
