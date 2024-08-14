import { IVehicle } from "@/lib/types";
import { Button, ButtonProps } from "./ui/button";
import { useState } from "react";
import { fetchData } from "@/lib/utils";
import { Badge } from "./ui/badge";

function VehicleRegistrationItem({ vehicle }: { vehicle: IVehicle }) {
  return (
    <div className="flex flex-col justify-between gap-4 h-fit border-b py-6">
      <div className="grid gap-2">
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
      </div>

      <div className="flex justify-end">
        <RegistrationActionButton
          action="Approve"
          className="w-full"
          vehicleId={vehicle._id}
        />
      </div>
    </div>
  );
}

interface RegistrationActionButtonProps extends ButtonProps {
  action: "Approve" | "Discard";
  vehicleId: string;
}
const RegistrationActionButton = ({
  action,
  vehicleId,
  ...props
}: RegistrationActionButtonProps) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleAction = async () => {
    try {
      const data = await fetchData(
        `/vehicles/${vehicleId}/${action.toLowerCase()}`,
        "PUT"
      );
      if (data.data) {
        setIsDisabled(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button size="sm" onClick={handleAction} {...props} disabled={isDisabled}>
      {action}
    </Button>
  );
};

export default VehicleRegistrationItem;
