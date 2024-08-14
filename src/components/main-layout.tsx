import { Outlet } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/lib/types";
import { useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ClipboardList, ClipboardPlus, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const NAV_ITEMS = [
  {
    to: "requests",
    label: "Requests",
    icon: <ClipboardList />,
    roles: [UserRole.POLICE],
  },
  {
    to: "/",
    label: "Register",
    icon: <ClipboardPlus />,
    roles: [UserRole.POLICE],
  },
];

function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = useMemo(() => {
    return NAV_ITEMS.map((item) => {
      if (
        user?.role === UserRole.POLICE &&
        item.roles.includes(UserRole.POLICE)
      )
        return (
          <TooltipProvider key={item.to}>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to={item.to}>
                  {({ isActive }) => (
                    <Button variant={isActive ? "default" : "secondary"}>
                      {item.icon}
                    </Button>
                  )}
                </NavLink>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
    });
  }, [user?.role]);

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-20 h-full px-2.5 py-10 flex flex-col justify-between">
        <div className="flex flex-col gap-4">{navItems}</div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
              >
                {user ? <LogOut /> : <LogIn />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p> {user ? "Log out" : "Log in"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Separator orientation="vertical" />
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
