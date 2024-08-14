import { IVehicle, VehicleStatus } from "@/lib/types";
import { Button, ButtonProps } from "./ui/button";
import { useState } from "react";
import { fetchData } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

function VehicleRegistrationItem({ vehicle }: { vehicle: IVehicle }) {
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="flex flex-col justify-between gap-4 h-fit border-b py-6">
      <div className="grid gap-2">
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="font-medium">First Name:</div>
          <div>{vehicle.firstName}</div>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="font-medium">Last Name:</div>
          <div>{vehicle.lastName}</div>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="font-medium">Date of Birth:</div>
          <div>{vehicle.dob}</div>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="font-medium">Email:</div>
          <div>{vehicle.email}</div>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="font-medium">Addrress:</div>
          <div>{vehicle.address || "none"}</div>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="font-medium">Phone:</div>
          <div>{vehicle.phone || "none"}</div>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="font-medium">Vehicle Code:</div>
          <Badge
            variant="outline"
            className="text-base justify-center rounded-md"
          >
            {vehicle.code}
          </Badge>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="font-medium">Vehicle Status:</div>
          <Badge
            variant="outline"
            className="text-base justify-center rounded-md capitalize"
          >
            {vehicle.status}
          </Badge>
        </div>
      </div>

      {vehicle.status === VehicleStatus.PENDING && (
        <div className="grid grid-cols-2 items-center gap-4">
          <RegistrationActionButton
            action="Approve"
            vehicleId={vehicle._id}
            disabled={isDisabled}
            onClick={() => setIsDisabled(true)}
          />
          <RegistrationActionButton
            disabled={isDisabled}
            action="Reject"
            vehicleId={vehicle._id}
            variant="secondary"
            onClick={() => setIsDisabled(true)}
          />
        </div>
      )}
    </div>
  );
}

interface RegistrationActionButtonProps extends ButtonProps {
  action: "Approve" | "Reject";
  vehicleId: string;
  onClick?: VoidFunction;
}
const RegistrationActionButton = ({
  action,
  vehicleId,
  onClick,
  ...props
}: RegistrationActionButtonProps) => {
  const [content, setContent] = useState<IVehicle | null>(null);
  const [open, setOpen] = useState(false);
  const handleAction = async () => {
    try {
      const data = await fetchData(
        `/vehicles/${vehicleId}/${action.toLowerCase()}`,
        "PUT"
      );
      if (data.success) {
        setOpen(true);
        setContent(data.data);
        onClick?.();
      }
    } catch (error) {
      //TODO: If failed to perform action, toast the error and not open dialog
      console.log(error);
    }
  };
  return (
    <Dialog open={open}>
      <Button size="sm" onClick={handleAction} {...props}>
        {action}
      </Button>
      <DialogContent
        aria-describedby={undefined}
        onInteractOutside={() => setOpen(false)}
        onEscapeKeyDown={() => setOpen(false)}
      >
        <DialogTitle>
          Successfully {action.toLowerCase()} a resgistration!
        </DialogTitle>
        {content && (
          <>
            <div className="space-x-2 flex justify-end">
              <p>
                An email is sent to{" "}
                <span className="font-medium">{content.email}</span> with the
                below information:
              </p>
            </div>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="font-medium">First Name:</div>
                <div>{content.firstName}</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="font-medium">Last Name:</div>
                <div>{content.lastName}</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="font-medium">Date of Birth:</div>
                <div>{content.dob}</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="font-medium">Email:</div>
                <div>{content.email}</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="font-medium">Addrress:</div>
                <div>{content.address || "none"}</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="font-medium">Phone:</div>
                <div>{content.phone || "none"}</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="font-medium">Vehicle Code:</div>
                <div>{content.code}</div>
              </div>
              <div className="grid grid-cols-2 items-center gap-4">
                <div className="font-medium">Vehicle Status:</div>
                <div>{content.status}</div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default VehicleRegistrationItem;
