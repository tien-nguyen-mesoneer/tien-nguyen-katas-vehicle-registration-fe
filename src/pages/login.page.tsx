import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center gap-14 items-center">
      <div>
        <p className="text-4xl font-semibold">Welcome!</p>
        <p className="text-xl font-medium">
          Log in as a Police officer to manage registrations
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        <Input type="text" defaultValue={"admin@gmail.com"} />
        <Input type="password" defaultValue={"01234"} />
        <Button
          onClick={() => {
            login();
            navigate("/");
          }}
        >
          Log in
        </Button>
      </div>
      <Separator className="w-96" />
      <Link to="/" className="text-sm italic underline">
        I'm not a police officer, I want to register a vehicle
      </Link>
    </div>
  );
}

export default LoginPage;
