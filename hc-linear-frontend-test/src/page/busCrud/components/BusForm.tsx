import { useState, type FormEvent } from "react";
import { Box, Stack, TextField } from "@mui/material";
import type { BusInput } from "../data/busCrud.types";
import { formatPlate, isValidPlate } from "../utils/plate";
import { busCrudStyles } from "../style/busCrud.style";
import CapacityField from "./CapacityField";
import StatusField from "./StatusField";

type Props = {
  id: string;
  initialValue: BusInput;
  onSubmit: (input: BusInput) => void;
  fullWidth?: boolean;
};

export default function BusForm({
  id,
  initialValue,
  onSubmit,
  fullWidth = false,
}: Props) {
  const [form, setForm] = useState<BusInput>(initialValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const input: BusInput = {
      ...form,
      plate: formatPlate(form.plate),
      model: form.model.trim(),
    };

    if (
      !isValidPlate(input.plate) ||
      !input.model ||
      !Number.isInteger(input.capacity) ||
      input.capacity < 1
    ) {
      return;
    }

    onSubmit(input);
  }

  return (
    <Box
      component="form"
      id={id}
      onSubmit={handleSubmit}
      sx={busCrudStyles.form}
    >
      <Stack spacing={2}>
        <TextField
          label="Rendszám"
          value={form.plate}
          onChange={(event) =>
            setForm({ ...form, plate: formatPlate(event.target.value) })
          }
          required
          fullWidth={fullWidth}
          color="success"
          slotProps={{
            htmlInput: { maxLength: 8, pattern: "[A-Z]{3,4}-[0-9]{3}" },
          }}
          helperText="3 vagy 4 betű, majd 3 szám: ABC-123 vagy ABCD-123"
          sx={busCrudStyles.textField}
        />

        <TextField
          label="Modell"
          value={form.model}
          onChange={(event) => setForm({ ...form, model: event.target.value })}
          required
          fullWidth={fullWidth}
          color="success"
          sx={busCrudStyles.textField}
        />

        <StatusField
          value={form.status}
          onChange={(status) => setForm({ ...form, status })}
          fullWidth={fullWidth}
        />

        <CapacityField
          value={form.capacity}
          onChange={(capacity) => setForm({ ...form, capacity })}
          fullWidth={fullWidth}
        />
      </Stack>
    </Box>
  );
}
