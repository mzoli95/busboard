import { boardAxiosClient } from "../../../config/axios.config";
import { TaskStatus } from "../data/board.data";
import type { BoardTask, NewBoardTask } from "../data/board.types";

export async function getTasks(): Promise<BoardTask[]> {
  const response = await boardAxiosClient.get<BoardTask[]>("/board");
  return response.data;
}

export async function createTask(input: NewBoardTask): Promise<BoardTask> {
  const response = await boardAxiosClient.post<BoardTask>("/board", {
    ...input,
    status: TaskStatus.Todo,
  });
  return response.data;
}

export async function updateTask(task: BoardTask): Promise<BoardTask> {
  const response = await boardAxiosClient.put<BoardTask>(`/board/${task.id}`, task);
  return response.data;
}

export async function updateTaskStatus(
  id: number,
  status: TaskStatus,
): Promise<BoardTask> {
  const response = await boardAxiosClient.patch<BoardTask>(`/board/${id}`, { status });
  return response.data;
}

export async function deleteTask(id: number): Promise<void> {
  await boardAxiosClient.delete(`/board/${id}`);
}
