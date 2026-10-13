import { useDraggable } from "@dnd-kit/react";
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { boardStyles } from "../style/board.style";
import type { BoardTask } from "../data/board.types";

type Props = {
  task: BoardTask;
  busy: boolean;
  onDetails: (task: BoardTask) => void;
  onEdit: (task: BoardTask) => void;
  onDelete: (task: BoardTask) => void;
};

export default function BoardTaskCard({ task, busy, onDetails, onEdit, onDelete }: Props) {
  const { ref, handleRef, isDragging } = useDraggable({
    id: `task-${task.id}`,
    disabled: busy,
  });

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={boardStyles.card(isDragging)}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
        <Tooltip title="Áthúzás másik oszlopba">
          <IconButton
            ref={handleRef}
            aria-label={`${task.title} áthúzása`}
            size="small"
            disabled={busy}
            sx={{ color: "#9fc0ca", touchAction: "none", cursor: "grab", mt: -0.25 }}
          >
            <DragIndicatorIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Box
          component="button"
          type="button"
          onClick={() => onDetails(task)}
          aria-label={`${task.title} részletei`}
          sx={boardStyles.cardDetailsButton}
        >
          <Typography sx={{ fontWeight: 700, overflowWrap: "anywhere", textAlign: "left" }}>
            {task.title}
          </Typography>
          {task.shortDescription && (
            <Typography sx={{ color: "#b7c8cf", fontSize: "0.8rem", mt: 0.4, overflowWrap: "anywhere" }}>
              {task.shortDescription}
            </Typography>
          )}
        </Box>
        <Tooltip title="Feladat szerkesztése">
          <IconButton
            aria-label={`${task.title} szerkesztése`}
            size="small"
            disabled={busy}
            onClick={() => onEdit(task)}
            sx={{ color: "#d5eeea", mt: -0.25 }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Feladat törlése">
          <IconButton
            aria-label={`${task.title} törlése`}
            size="small"
            disabled={busy}
            onClick={() => onDelete(task)}
            sx={{ color: "#ff8d8d", mt: -0.25 }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
}
