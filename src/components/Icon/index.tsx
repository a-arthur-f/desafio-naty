import { Person as ClientIcon } from "@mui/icons-material";
import { DriveEta as VehicleIcon } from "@mui/icons-material";
import { AirlineSeatReclineExtra as DriverIcon } from "@mui/icons-material";
import { TrendingUp as DisplacementIcon } from "@mui/icons-material";

type IconName = "client" | "driver" | "vehicle" | "displacement";

interface IconProps {
  name: IconName;
}

export default function Icon({ name }: IconProps) {
  function getIcon(name: IconName) {
    switch (name) {
      case "client":
        return <ClientIcon titleAccess="ícone de cliente" />;
      case "driver":
        return <DriverIcon titleAccess="ícone de condutor" />;
      case "vehicle":
        return <VehicleIcon titleAccess="ícone de veículo" />;
      case "displacement":
        return <DisplacementIcon titleAccess="ícone de deslocamento" />;
    }
  }
  return <>{getIcon(name)}</>;
}
