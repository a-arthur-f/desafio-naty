import ClientIcon from "@mui/icons-material/Person";
import VehicleIcon from "@mui/icons-material/DriveEta";
import DriverIcon from "@mui/icons-material/AirlineSeatReclineExtra";
import DisplacementIcon from "@mui/icons-material/TrendingUp";
import { SxProps } from "@mui/material";

type IconName = "client" | "driver" | "vehicle" | "displacement";

interface IconProps {
  name: IconName;
  sx?: SxProps;
}

export default function Icon({ name, sx }: IconProps) {
  function getIcon(name: IconName) {
    switch (name) {
      case "client":
        return <ClientIcon titleAccess="ícone de cliente" sx={sx} />;
      case "driver":
        return <DriverIcon titleAccess="ícone de condutor" sx={sx} />;
      case "vehicle":
        return <VehicleIcon titleAccess="ícone de veículo" sx={sx} />;
      case "displacement":
        return <DisplacementIcon titleAccess="ícone de deslocamento" sx={sx} />;
    }
  }
  return <>{getIcon(name)}</>;
}
