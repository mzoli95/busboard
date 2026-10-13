import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { BOARD_QUERY_KEY } from "../board.queries";
import { createTask, updateTask } from "../services/board.service";
import { boardStyles } from "../style/board.style";
import { EMPTY_TASK_INPUT } from "../data/board.data";
import type { BoardTask, NewBoardTask } from "../data/board.types";
import TaskForm from "./TaskForm";

type Props = {
  task: BoardTask | null;
  onClose: () => void;
};

export default function TaskFormDialog({ task, onClose }: Props) {
  const initialValue: NewBoardTask = task ? {
    title: task?.title ?? "",
    shortDescription: task?.shortDescription ?? "",
    description: task?.description ?? "",
  } : EMPTY_TASK_INPUT;
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (input: NewBoardTask) =>
      task ? updateTask({ ...task, ...input }) : createTask(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY });
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
      open
      onClose={closeDialog}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: boardStyles.dialogPaper,
        },
      }}
    >
      <DialogTitle fontWeight={800}>
        {task ? "Feladat szerkesztése" : "Új feladat"}
      </DialogTitle>
      <DialogContent>
          {mutation.isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              Nem sikerült elmenteni a feladatot.
            </Alert>
          )}
          <TaskForm
            id="task-form"
            initialValue={initialValue}
            onSubmit={(input) => mutation.mutate(input)}
          />
      </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={closeDialog} disabled={mutation.isPending}>
            Mégse
          </Button>
          <Button
            type="submit"
            form="task-form"
            variant="contained"
            disabled={mutation.isPending}
            sx={boardStyles.primaryButton}
          >
            {mutation.isPending ? "Mentés..." : task ? "Módosítás mentése" : "Felvétel"}
          </Button>
        </DialogActions>
    </Dialog>
  );
}
