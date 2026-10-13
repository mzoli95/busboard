import { DragDropProvider } from "@dnd-kit/react";
import { Box } from "@mui/material";
import { BOARD_COLUMNS, isTaskStatus, type TaskStatus } from "../data/board.data";
import type { BoardTask } from "../data/board.types";
import { boardStyles } from "../style/board.style";
import BoardColumn from "./BoardColumn";

type Props = {
  tasks: BoardTask[];
  busy: boolean;
  onMove: (id: number, status: TaskStatus) => void;
  onDetails: (task: BoardTask) => void;
  onEdit: (task: BoardTask) => void;
  onDelete: (task: BoardTask) => void;
};

export default function BoardGrid({
  tasks,
  busy,
  onMove,
  onDetails,
  onEdit,
  onDelete,
}: Props) {
  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;
        const { source, target } = event.operation;
        if (!source || !target || !isTaskStatus(target.id)) return;
        const task = tasks.find((item) => `task-${item.id}` === source.id);
        if (task) onMove(task.id, target.id);
      }}
    >
      <Box sx={boardStyles.grid}>
        {BOARD_COLUMNS.map((column) => (
          <BoardColumn
            key={column.status}
            {...column}
            tasks={tasks.filter((task) => task.status === column.status)}
            busy={busy}
            onDetails={onDetails}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </Box>
    </DragDropProvider>
  );
}
