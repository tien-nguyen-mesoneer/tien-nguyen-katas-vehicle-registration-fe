import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/context/auth-context";
import { UserRole } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { ClipboardList, ClipboardPlus, IdCard, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Act as main layout for : /view, /register, /requests
// Conditionally render nav.items:

const NAV_ITEMS = [
  {
    to: "requests",
    label: "Requests",
    icon: <ClipboardList />,
    roles: [UserRole.POLICE],
  },
  {
    to: "register",
    label: "Register",
    icon: <ClipboardPlus />,
    roles: [UserRole.GENERAL, UserRole.POLICE],
  },
  {
    to: "view",
    label: "My License",
    icon: <IdCard />,
    roles: [UserRole.GENERAL, UserRole.POLICE],
  },
];
function VehiclePage() {
  const { user, logout, verifyRegistration } = useAuth();
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const navItems = useMemo(() => {
    return NAV_ITEMS.map((item) => {
      // Conditionally render nav item with role
      if (user && item.roles.includes(user.role)) {
        // Conditionally show register form
        if (
          user.role === UserRole.GENERAL &&
          isRegistered &&
          item.to === "register"
        ) {
          return null;
        } else {
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
        }
      }
    });
  }, [user?.role, user?.vehicle, isRegistered]);

  useEffect(() => {
    async function init() {
      const isRegistered = await verifyRegistration();
      setIsRegistered(isRegistered);
    }
    init();
    navigate(`/vehicles/view`);
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="w-20 h-full px-2.5 py-10 flex flex-col justify-between">
        <div className="flex flex-col gap-4">{navItems}</div>
        <Button variant="link" onClick={logout}>
          <LogOut />
        </Button>
      </div>
      <Separator orientation="vertical" />
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}

export default VehiclePage;
