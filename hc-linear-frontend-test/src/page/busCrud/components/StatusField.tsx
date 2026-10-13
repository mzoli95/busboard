import { MenuItem, TextField } from "@mui/material";
import {
  busStatusLabels,
  busStatuses,
  type BusStatus,
} from "../data/busCrud.data";
import { busCrudStyles } from "../style/busCrud.style";

type Props = {
  value: BusStatus;
  onChange: (value: BusStatus) => void;
  fullWidth?: boolean;
};

export default function StatusField({ value, onChange, fullWidth = false }: Props) {
  return (
    <TextField
      select
      label="Állapot"
      value={value}
      onChange={(event) => onChange(event.target.value as BusStatus)}
      fullWidth={fullWidth}
      color="success"
      slotProps={{
        select: {
          MenuProps: {
            PaperProps: {
              sx: busCrudStyles.statusMenu,
            },
          },
        },
      }}
      sx={busCrudStyles.statusField}
    >
      {busStatuses.map((status) => (
        <MenuItem key={status} value={status}>
          {busStatusLabels[status]}
        </MenuItem>
      ))}
    </TextField>
  );
}
