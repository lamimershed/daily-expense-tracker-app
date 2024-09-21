import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const AppLayout = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
