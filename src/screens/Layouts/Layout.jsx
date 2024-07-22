import Menu from "@/components/Menu";
import { Outlet } from "react-router-dom";

const AdminLayout = ({onLogout}) => {
  return (
    <div className="h-screen w-screen flex">
      <Menu onLogout={onLogout}/>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
