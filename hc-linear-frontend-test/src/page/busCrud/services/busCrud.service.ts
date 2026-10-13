import { busesAxiosClient } from "../../../config/axios.config";
import type { BusInput, Bus } from "../data/busCrud.types";

export async function getBuses(): Promise<Bus[]> {
  const response = await busesAxiosClient.get<Bus[]>("/buses");
  return response.data;
}

export async function createBus(input: BusInput): Promise<Bus> {
  const response = await busesAxiosClient.post<Bus>("/buses", input);
  return response.data;
}

export async function updateBus(id: string, input: BusInput): Promise<Bus> {
  const response = await busesAxiosClient.patch<Bus>(`/buses/${id}`, input);
  return response.data;
}

export async function deleteBus(id: number): Promise<void> {
  await busesAxiosClient.delete(`/buses/${id}`);
}
