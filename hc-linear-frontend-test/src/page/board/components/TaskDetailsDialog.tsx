import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { TASK_STATUS_LABELS } from "../data/board.data";
import { boardStyles } from "../style/board.style";
import type { BoardTask } from "../data/board.types";

type Props = {
  task: BoardTask | null;
  onClose: () => void;
};

export default function TaskDetailsDialog({ task, onClose }: Props) {
  const statusLabel = task ? TASK_STATUS_LABELS[task.status] : "";

  return (
    <Dialog
      open={task !== null}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { sx: boardStyles.dialogPaper } }}
    >
      <DialogTitle fontWeight={800}>Feladat részletei</DialogTitle>
      <DialogContent>
        <Box sx={boardStyles.detailRow}>
          <Typography variant="caption" sx={boardStyles.detailLabel}>Cím</Typography>
          <Typography sx={boardStyles.detailValue}>{task?.title}</Typography>
        </Box>
        <Box sx={boardStyles.detailRow}>
          <Typography variant="caption" sx={boardStyles.detailLabel}>Rövid leírás</Typography>
          <Typography sx={boardStyles.detailValue}>{task?.shortDescription || "—"}</Typography>
        </Box>
        <Box sx={boardStyles.detailRow}>
          <Typography variant="caption" sx={boardStyles.detailLabel}>Részletes leírás</Typography>
          <Typography sx={{ ...boardStyles.detailValue, whiteSpace: "pre-wrap" }}>
            {task?.description || "Nincs részletes leírás."}
          </Typography>
        </Box>
        <Box sx={boardStyles.detailRow}>
          <Typography variant="caption" sx={boardStyles.detailLabel}>Állapot</Typography>
          <Typography sx={boardStyles.detailValue}>{statusLabel}</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ color: "#1be29a" }}>Bezárás</Button>
      </DialogActions>
    </Dialog>
  );
}
