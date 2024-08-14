import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
}

export default MainLayout;
