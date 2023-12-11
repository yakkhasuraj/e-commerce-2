import { Navbar } from "@/common/ui/layouts";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      {children}
    </>
  );
};

export default PublicLayout;
