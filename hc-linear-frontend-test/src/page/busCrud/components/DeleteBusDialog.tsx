import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Bus } from "../data/busCrud.types";
import { busCrudStyles } from "../style/busCrud.style";

type Props = {
  bus: Bus | null;
  isPending: boolean;
  onCancel: () => void;
  onConfirm: (id: number) => void;
};

export default function DeleteBusDialog({
  bus,
  isPending,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Dialog
      open={bus !== null}
      onClose={() => !isPending && onCancel()}
      slotProps={{ paper: { sx: busCrudStyles.dialogPaper } }}
    >
      <DialogTitle>Busz törlése</DialogTitle>
      <DialogContent sx={{ color: "#d5eeea" }}>
        Biztosan törlöd a(z) {bus?.plate} rendszámú buszt?
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          disabled={isPending}
          sx={{ color: "#d5eeea" }}
        >
          Mégse
        </Button>
        <Button
          color="error"
          disabled={isPending}
          onClick={() => bus && onConfirm(bus.id)}
        >
          {isPending ? "Törlés..." : "Törlés"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
