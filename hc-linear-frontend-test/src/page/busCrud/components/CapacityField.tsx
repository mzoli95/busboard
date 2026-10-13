import { InputAdornment, TextField } from "@mui/material";
import { busCrudStyles } from "../style/busCrud.style";

type Props = {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  fullWidth?: boolean;
};

export default function CapacityField({
  value,
  onChange,
  disabled = false,
  fullWidth = false,
}: Props) {
  return (
    <TextField
      label="Férőhelyek száma"
      type="number"
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      disabled={disabled}
      required
      fullWidth={fullWidth}
      color="success"
      slotProps={{
        htmlInput: { min: 1, step: 1 },
        input: {
          endAdornment: (
            <InputAdornment position="end" sx={{ "& .MuiTypography-root": { color: "#b7c8cf" } }}>
              fő
            </InputAdornment>
          ),
        },
      }}
      sx={busCrudStyles.capacityField}
    />
  );
}
