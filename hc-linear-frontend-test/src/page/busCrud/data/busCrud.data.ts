export const BusStatus = {
  Operational: "operational",
  Maintenance: "maintenance",
} as const;

export type BusStatus = (typeof BusStatus)[keyof typeof BusStatus];

export const busStatuses = Object.values(BusStatus);

export const busStatusLabels: Record<BusStatus, string> = {
  [BusStatus.Operational]: "Üzemképes",
  [BusStatus.Maintenance]: "Karbantartás alatt",
};

export const EMPTY_BUS_INPUT = {
  plate: "",
  model: "",
  status: BusStatus.Operational,
  capacity: 1,
} as const;
