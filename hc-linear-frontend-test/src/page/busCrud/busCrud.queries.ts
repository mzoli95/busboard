export const BUS_QUERY_KEY = ["buses"] as const;
export const busQueryKey = (id: string) => [...BUS_QUERY_KEY, id] as const;
