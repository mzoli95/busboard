import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Bus, BusInput } from "../data/busCrud.types";
import { updateBus } from "../services/busCrud.service";
import { BUS_QUERY_KEY } from "../busCrud.queries";
import { busCrudStyles } from "../style/busCrud.style";
import { formatPlate } from "../utils/plate";
import BusForm from "./BusForm";

type Props = {
  bus: Bus | null;
  onClose: () => void;
};

export default function BusEditDialog({ bus, onClose }: Props) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, input }: { id: number; input: BusInput }) =>
      updateBus(String(id), input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: BUS_QUERY_KEY });
      onClose();
    },
  });

  function closeDialog() {
    if (mutation.isPending) return;
    mutation.reset();
    onClose();
  }

  const initialValue: BusInput | null = bus
    ? {
        plate: formatPlate(bus.plate),
        model: bus.model,
        status: bus.status,
        capacity: bus.capacity,
      }
    : null;

  return (
    <Dialog
      open={bus !== null}
      onClose={closeDialog}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { sx: busCrudStyles.dialogPaper } }}
    >
      <DialogTitle fontWeight={800}>Busz szerkesztése</DialogTitle>
      <DialogContent>
        {mutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Nem sikerült menteni a módosításokat.
          </Alert>
        )}
        {bus && initialValue && (
          <BusForm
            key={bus.id}
            id="edit-bus-form"
            initialValue={initialValue}
            onSubmit={(input) => mutation.mutate({ id: bus.id, input })}
            fullWidth
          />
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={closeDialog} disabled={mutation.isPending}>
          Mégse
        </Button>
        <Button
          type="submit"
          form="edit-bus-form"
          variant="contained"
          disabled={mutation.isPending || !bus}
          sx={busCrudStyles.primaryButton}
        >
          {mutation.isPending ? "Mentés..." : "Módosítás mentése"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
