import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { BoardTask } from "../data/board.types";
import { boardStyles } from "../style/board.style";

type Props = {
  task: BoardTask | null;
  isPending: boolean;
  onCancel: () => void;
  onConfirm: (id: number) => void;
};

export default function DeleteTaskDialog({
  task,
  isPending,
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Dialog
      open={task !== null}
      onClose={() => !isPending && onCancel()}
      slotProps={{ paper: { sx: boardStyles.dialogPaper } }}
    >
      <DialogTitle>Feladat törlése</DialogTitle>
      <DialogContent sx={{ color: "#d5eeea" }}>
        Biztosan törlöd ezt a feladatot: „{task?.title}”?
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isPending} sx={{ color: "#d5eeea" }}>
          Mégse
        </Button>
        <Button
          color="error"
          disabled={isPending}
          onClick={() => task && onConfirm(task.id)}
        >
          {isPending ? "Törlés..." : "Törlés"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
