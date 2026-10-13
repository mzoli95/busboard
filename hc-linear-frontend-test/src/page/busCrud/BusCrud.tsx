import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BusFormDialog from "./components/BusFormDialog";
import BusTable from "./components/BusTable";
import DeleteBusDialog from "./components/DeleteBusDialog";
import BusDetailsDialog from "./components/BusDetailsDialog";
import BusEditDialog from "./components/BusEditDialog";
import type { Bus } from "./data/busCrud.types";
import { deleteBus, getBuses } from "./services/busCrud.service";
import { BUS_QUERY_KEY } from "./busCrud.queries";
import { busCrudStyles } from "./style/busCrud.style";

export default function BusCrud() {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [busToView, setBusToView] = useState<Bus | null>(null);
  const [busToEdit, setBusToEdit] = useState<Bus | null>(null);
  const [busToDelete, setBusToDelete] = useState<Bus | null>(null);

  const {
    data: buses = [],
    isPending,
    isError,
  } = useQuery({ queryKey: BUS_QUERY_KEY, queryFn: getBuses });

  const deleteMutation = useMutation({
    mutationFn: deleteBus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: BUS_QUERY_KEY });
      setBusToDelete(null);
    },
  });

  return (
    <Box component="main" sx={busCrudStyles.page}>
      <Box sx={busCrudStyles.header}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={800} color="#fff">
            Buszok
          </Typography>
          <Typography color="#b7c8cf">A járművek kezelése</Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormOpen(true)}
          sx={busCrudStyles.primaryButton}
        >
          Új busz
        </Button>
      </Box>

      {isPending && <CircularProgress color="success" />}
      {isError && (
        <Alert severity="error">
          Nem sikerült betölteni a buszokat. Ellenőrizd, fut-e a backend.
        </Alert>
      )}
      {deleteMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Nem sikerült törölni a buszt.
        </Alert>
      )}

      {!isPending && !isError && (
        <BusTable
          buses={buses}
          onView={setBusToView}
          onEdit={setBusToEdit}
          onDelete={setBusToDelete}
        />
      )}

      <BusFormDialog open={formOpen} onClose={() => setFormOpen(false)} />
      <BusDetailsDialog
        bus={busToView}
        onClose={() => setBusToView(null)}
        onEdit={(bus) => {
          setBusToView(null);
          setBusToEdit(bus);
        }}
      />
      <BusEditDialog bus={busToEdit} onClose={() => setBusToEdit(null)} />
      <DeleteBusDialog
        bus={busToDelete}
        isPending={deleteMutation.isPending}
        onCancel={() => setBusToDelete(null)}
        onConfirm={(id) => deleteMutation.mutate(id)}
      />
    </Box>
  );
}
