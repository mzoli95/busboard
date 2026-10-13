import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { createBus } from "../services/busCrud.service";
import { EMPTY_BUS_INPUT } from "../data/busCrud.data";
import { busCrudStyles } from "../style/busCrud.style";
import { BUS_QUERY_KEY } from "../busCrud.queries";
import BusForm from "./BusForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function BusFormDialog({ open, onClose }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBus,
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

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            bgcolor: "#123b4d",
            color: "#fff",
            border: "1px solid rgba(27,226,154,0.3)",
            borderRadius: 3,
          },
        },
      }}
    >
      <DialogTitle fontWeight={800}>Új busz felvétele</DialogTitle>

      <DialogContent>
        {mutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Nem sikerült elmenteni a buszt.
          </Alert>
        )}
        <BusForm
          id="create-bus-form"
          initialValue={EMPTY_BUS_INPUT}
          onSubmit={(input) => mutation.mutate(input)}
          fullWidth
        />
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={closeDialog} disabled={mutation.isPending}>
          Mégse
        </Button>
        <Button
          type="submit"
          form="create-bus-form"
          variant="contained"
          disabled={mutation.isPending}
          sx={busCrudStyles.primaryButton}
        >
          {mutation.isPending ? "Mentés..." : "Mentés"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
