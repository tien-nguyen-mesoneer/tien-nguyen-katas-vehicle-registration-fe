import { useEffect, useState } from "react";
import { IVehicle } from "@/lib/types";
import { fetchData } from "@/lib/utils";
import VehicleRegistrationItem from "./vehicle-registration-item";
import { Separator } from "./ui/separator";

type Props = {};

function VehicleRegistrationList({}: Props) {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);

  useEffect(() => {
    const getVehicles = async () => {
      try {
        const data = await fetchData("/vehicles", "GET");
        if (data) {
          setVehicles(data.data as IVehicle[]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getVehicles();
  }, []);

  return (
    <div className="h-screen flex flex-col max-w-xl p-6 space-y-6 border-r">
      <div>
        <p className="text-lg font-medium">Vehicle Registry</p>
        <p className="text-sm text-muted-foreground">
          Official documnent of your vehicle registry
        </p>
        <Separator className="mt-5" />
      </div>
      {vehicles.length ? (
        <div className="h-full overflow-y-scroll no-scrollbar">
          <div className="h-fit flex flex-col">
            {vehicles?.map((vehicle) => (
              <VehicleRegistrationItem key={vehicle._id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      ) : (
        <p className="font-medium">You have no registration requests!</p>
      )}
    </div>
  );
}

export default VehicleRegistrationList;
