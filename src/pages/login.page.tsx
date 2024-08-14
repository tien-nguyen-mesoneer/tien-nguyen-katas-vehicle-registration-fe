import { Button, ButtonProps } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRole } from "@/lib/types";
import { Navigate, useNavigate } from "react-router-dom";
import { MOCK_USERS } from "@/lib/data";

function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" />;
  }

  const handleLogin = (role: UserRole, redirect: string) => {
    login(role);
    navigate(redirect);
  };

  return (
    <div className="w-max h-max space-y-20">
      <div>
        <p className="text-4xl font-semibold">Welcome!</p>
        <p className="text-xl font-medium">
          Let's register your first vehicle.
        </p>
      </div>
      <div className="flex gap-10">
        <Profile
          img={MOCK_USERS.GENERAL.img}
          name={MOCK_USERS.GENERAL.role}
          onClick={() => handleLogin(MOCK_USERS.GENERAL.role, "/vehicles")}
          variant="secondary"
        />
        <Profile
          img={MOCK_USERS.POLICE.img}
          name={MOCK_USERS.POLICE.role}
          onClick={() => handleLogin(MOCK_USERS.POLICE.role, "/vehicles")}
        />
      </div>
    </div>
  );
}

interface ProfileProps extends ButtonProps {
  img: string;
  name: string;
  onClick: VoidFunction;
}

const Profile = ({ img, name, onClick, ...props }: ProfileProps) => {
  return (
    <Button
      className="h-full flex flex-col justify-center gap-3 shadow-xl p-4 rounded-lg"
      onClick={onClick}
      {...props}
    >
      <Avatar className="w-36 h-36">
        <AvatarImage src={img} />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>
      <p className="font-extrabold">{name}</p>
    </Button>
  );
};

export default LoginPage;
