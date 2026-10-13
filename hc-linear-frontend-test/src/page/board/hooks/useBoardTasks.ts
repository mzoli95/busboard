import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BOARD_QUERY_KEY } from "../board.queries";
import { deleteTask, getTasks, updateTaskStatus } from "../services/board.service";
import type { TaskStatus } from "../data/board.data";
import type { BoardTask } from "../data/board.types";

type MoveInput = { id: number; status: TaskStatus };

export function useBoardTasks() {
  const queryClient = useQueryClient();
  const { data: tasks = [], isPending, isError } = useQuery({
    queryKey: BOARD_QUERY_KEY,
    queryFn: getTasks,
  });

  const moveMutation = useMutation({
    mutationFn: ({ id, status }: MoveInput) => updateTaskStatus(id, status),
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: BOARD_QUERY_KEY });
      const previous = queryClient.getQueryData<BoardTask[]>(BOARD_QUERY_KEY);
      queryClient.setQueryData<BoardTask[]>(BOARD_QUERY_KEY, (current = []) =>
        current.map((task) => (task.id === id ? { ...task, status } : task)),
      );
      return { previous };
    },
    onError: (_error, _input, context) => {
      if (context?.previous) queryClient.setQueryData(BOARD_QUERY_KEY, context.previous);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: BOARD_QUERY_KEY });
    },
  });

  const busy = moveMutation.isPending || deleteMutation.isPending;

  function moveTask(id: number, status: TaskStatus) {
    if (busy) return;
    const task = tasks.find((item) => item.id === id);
    if (task && task.status !== status) moveMutation.mutate({ id, status });
  }

  return { tasks, isPending, isError, moveMutation, deleteMutation, busy, moveTask };
}
