import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { BUS_QUERY_KEY, busQueryKey } from "./busCrud.queries";
import BusForm from "./components/BusForm";
import type { BusInput } from "./data/busCrud.types";
import { getBus, updateBus } from "./services/busCrud.service";
import { busCrudStyles } from "./style/busCrud.style";
import { formatPlate } from "./utils/plate";

export default function BusEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: bus, isPending, isError } = useQuery({
    queryKey: busQueryKey(id ?? ""),
    queryFn: () => getBus(id!),
    enabled: Boolean(id),
  });
  const mutation = useMutation({
    mutationFn: (input: BusInput) => updateBus(id!, input),
    onSuccess: async (updatedBus) => {
      queryClient.setQueryData(busQueryKey(String(updatedBus.id)), updatedBus);
      await queryClient.invalidateQueries({ queryKey: BUS_QUERY_KEY });
      navigate(`/buses/${updatedBus.id}`);
    },
  });

  const initialValue: BusInput | null = bus
    ? { plate: formatPlate(bus.plate), model: bus.model, status: bus.status, capacity: bus.capacity }
    : null;

  return (
    <Box component="main" sx={busCrudStyles.page}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(id ? `/buses/${id}` : "/buses")} sx={{ color: "#d5eeea", mb: 2 }}>
        Vissza
      </Button>
      {isPending && <CircularProgress color="success" />}
      {isError && <Alert severity="error">A busz nem található vagy nem sikerült betölteni.</Alert>}
      {bus && initialValue && (
        <Paper sx={busCrudStyles.pageCard}>
          <Typography variant="h4" component="h1" fontWeight={800} sx={{ mb: 3 }}>Busz szerkesztése</Typography>
          {mutation.isError && <Alert severity="error" sx={{ mb: 2 }}>Nem sikerült menteni a módosításokat.</Alert>}
          <BusForm key={bus.id} id="edit-bus-form" initialValue={initialValue} onSubmit={(input) => mutation.mutate(input)} fullWidth />
          <Stack direction="row" justifyContent="flex-end" spacing={2} sx={{ mt: 3 }}>
            <Button onClick={() => navigate(`/buses/${bus.id}`)} disabled={mutation.isPending}>Mégse</Button>
            <Button type="submit" form="edit-bus-form" variant="contained" disabled={mutation.isPending} sx={busCrudStyles.primaryButton}>
              {mutation.isPending ? "Mentés..." : "Módosítás mentése"}
            </Button>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
