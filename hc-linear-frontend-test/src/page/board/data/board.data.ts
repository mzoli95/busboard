import type { NewBoardTask } from "./board.types";

export const TaskStatus = {
  Todo: "todo",
  InProgress: "in_progress",
  Done: "done",
} as const;

export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.Todo]: "Teendő",
  [TaskStatus.InProgress]: "Folyamatban",
  [TaskStatus.Done]: "Kész",
};

export const BOARD_COLUMNS: {
  status: TaskStatus;
  title: string;
  color: string;
}[] = [
  { status: TaskStatus.Todo, title: TASK_STATUS_LABELS.todo, color: "#6ab9ff" },
  {
    status: TaskStatus.InProgress,
    title: TASK_STATUS_LABELS.in_progress,
    color: "#facc15",
  },
  { status: TaskStatus.Done, title: TASK_STATUS_LABELS.done, color: "#1be29a" },
];

export const EMPTY_TASK_INPUT: NewBoardTask = {
  title: "",
  shortDescription: "",
  description: "",
};

export function isTaskStatus(value: unknown): value is TaskStatus {
  return Object.values(TaskStatus).some((status) => status === value);
}
