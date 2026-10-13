import type { BusStatus } from "./busCrud.data";

export type Bus = {
  id: number;
  plate: string;
  model: string;
  status: BusStatus;
  capacity: number;
};
export type BusInput = Omit<Bus, "id">;
