import { Badge } from "./ui/badge";
import { useAuth } from "@/context/auth-context";
import { useEffect, useState } from "react";
import { fetchData } from "@/lib/utils";
import { IVehicle } from "@/lib/types";
import { Separator } from "./ui/separator";
type Props = {};

function VehicleRegistrationView({}: Props) {
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState<IVehicle>();

  useEffect(() => {
    const getVehicle = async () => {
      try {
        const data = await fetchData(`/vehicles/users/${user?._id}`, "GET");
        if (data) {
          setVehicle(data.data as IVehicle);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getVehicle();
  }, []);
  return (
    <div className="h-full max-w-xl border-b p-6 space-y-6 border-r">
      <div>
        <p className="text-lg font-medium">Vehicle Registry</p>
        <p className="text-sm text-muted-foreground">
          Official documnent of your vehicle registry
        </p>
        <Separator className="mt-5" />
      </div>
      <div className="space-y-2">
        {vehicle ? (
          <>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-medium">First Name:</div>
              <div>{vehicle.user.firstName}</div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-medium">Last Name:</div>
              <div>{vehicle.user.lastName}</div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-medium">Date of Birth:</div>
              <div>{vehicle.user.dob}</div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-medium">Email:</div>
              <div>{vehicle.user.email}</div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-medium">Addrress:</div>
              <div>{vehicle.user.address || "none"}</div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-medium">Phone:</div>
              <div>{vehicle.user.phone || "none"}</div>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-medium">Vehicle Code:</div>
              <Badge
                variant="secondary"
                className="text-lg justify-center rounded-md"
              >
                {vehicle.code}
              </Badge>
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="font-medium">Status:</div>
              <Badge
                variant={vehicle.approved ? "secondary" : "outline"}
                className="text-lg justify-center rounded-md"
              >
                {vehicle.approved ? "Approved" : "Pending"}
              </Badge>
            </div>
          </>
        ) : (
          <p className="font-medium">You have not registered a vehicle!</p>
        )}
      </div>
    </div>
  );
}

export default VehicleRegistrationView;
