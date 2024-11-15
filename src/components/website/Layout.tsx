import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className={cn("w-screen flex  flex-col justify-between", className)}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
