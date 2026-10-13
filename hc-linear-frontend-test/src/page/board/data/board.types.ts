import type { TaskStatus } from "./board.data";

export type BoardTask = {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  status: TaskStatus;
};

export type NewBoardTask = Pick<
  BoardTask,
  "title" | "shortDescription" | "description"
>;
