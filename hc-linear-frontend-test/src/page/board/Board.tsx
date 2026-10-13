import { useState } from "react";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BoardGrid from "./components/BoardGrid";
import DeleteTaskDialog from "./components/DeleteTaskDialog";
import TaskDetailsDialog from "./components/TaskDetailsDialog";
import TaskFormDialog from "./components/TaskFormDialog";
import { useBoardTasks } from "./hooks/useBoardTasks";
import { boardStyles } from "./style/board.style";
import type { BoardTask } from "./data/board.types";

export default function Board() {
  const [formTask, setFormTask] = useState<BoardTask | "new" | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<BoardTask | null>(null);
  const [detailsTaskId, setDetailsTaskId] = useState<number | null>(null);
  const { tasks, isPending, isError, moveMutation, deleteMutation, busy, moveTask } =
    useBoardTasks();
  const detailsTask = tasks.find((task) => task.id === detailsTaskId) ?? null;

  return (
    <Box component="main" sx={boardStyles.page}>
      <Box sx={boardStyles.header}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={800} color="#fff">
            Drag & Drop
          </Typography>
          <Typography color="#b7c8cf">
            Húzd át a kártyákat egy másik oszlopba; a részletekhez kattints a
            kártyára.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormTask("new")}
          sx={boardStyles.primaryButton}
        >
          Új feladat
        </Button>
      </Box>

      {isPending && <CircularProgress color="success" />}
      {isError && (
        <Alert severity="error">
          Nem sikerült betölteni a feladatokat. Ellenőrizd, fut-e a backend.
        </Alert>
      )}
      {moveMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Nem sikerült áthelyezni a feladatot. Az előző állapot visszaállt.
        </Alert>
      )}
      {deleteMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Nem sikerült törölni a feladatot.
        </Alert>
      )}

      {!isPending && !isError && (
        <BoardGrid
          tasks={tasks}
          busy={busy}
          onMove={moveTask}
          onDetails={(task) => setDetailsTaskId(task.id)}
          onEdit={setFormTask}
          onDelete={setTaskToDelete}
        />
      )}

      {formTask && (
        <TaskFormDialog
          key={formTask === "new" ? "new" : formTask.id}
          task={formTask === "new" ? null : formTask}
          onClose={() => setFormTask(null)}
        />
      )}
      <TaskDetailsDialog task={detailsTask} onClose={() => setDetailsTaskId(null)} />
      <DeleteTaskDialog
        task={taskToDelete}
        isPending={deleteMutation.isPending}
        onCancel={() => setTaskToDelete(null)}
        onConfirm={(id) =>
          deleteMutation.mutate(id, { onSuccess: () => setTaskToDelete(null) })
        }
      />
    </Box>
  );
}
