import { useDroppable } from "@dnd-kit/react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import BoardTaskCard from "./BoardTaskCard";
import { boardStyles } from "../style/board.style";
import type { TaskStatus } from "../data/board.data";
import type { BoardTask } from "../data/board.types";

type Props = {
  status: TaskStatus;
  title: string;
  color: string;
  tasks: BoardTask[];
  busy: boolean;
  onDetails: (task: BoardTask) => void;
  onEdit: (task: BoardTask) => void;
  onDelete: (task: BoardTask) => void;
};

export default function BoardColumn({ status, title, color, tasks, busy, onDetails, onEdit, onDelete }: Props) {
  const { ref, isDropTarget } = useDroppable({ id: status });

  return (
    <Box
      ref={ref}
      component="section"
      aria-label={title}
      sx={boardStyles.column(isDropTarget)}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={boardStyles.columnHeader}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box sx={{ width: 9, height: 9, borderRadius: "50%", bgcolor: color }} />
          <Typography component="h2" fontWeight={700} color="#1be29a">
            {title}
          </Typography>
        </Stack>
        <Chip
          label={tasks.length}
          size="small"
          sx={{ bgcolor: "rgba(27,226,154,0.12)", color: "#1be29a", fontWeight: 700 }}
        />
      </Stack>
      <Stack spacing={1.5} sx={boardStyles.columnContent}>
        {tasks.map((task) => (
          <BoardTaskCard
            key={task.id}
            task={task}
            busy={busy}
            onDetails={onDetails}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && (
          <Typography sx={{ color: "#9fc0ca", textAlign: "center", py: 4, fontSize: 14 }}>
            Húzz ide egy feladatot
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
