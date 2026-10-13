import { useQuery } from "@tanstack/react-query";
import { Alert, Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate, useParams } from "react-router-dom";
import { busQueryKey } from "./busCrud.queries";
import { busStatusLabels } from "./data/busCrud.data";
import { getBus } from "./services/busCrud.service";
import { busCrudStyles } from "./style/busCrud.style";
import { formatPlate } from "./utils/plate";

export default function BusDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: bus, isPending, isError } = useQuery({
    queryKey: busQueryKey(id ?? ""),
    queryFn: () => getBus(id!),
    enabled: Boolean(id),
  });

  const details = bus
    ? [
        { label: "Rendszám", value: formatPlate(bus.plate) },
        { label: "Modell", value: bus.model },
        { label: "Állapot", value: busStatusLabels[bus.status] },
        { label: "Férőhelyek", value: `${bus.capacity} fő` },
      ]
    : [];

  return (
    <Box component="main" sx={busCrudStyles.page}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/buses")} sx={{ color: "#d5eeea", mb: 2 }}>
        Vissza a buszokhoz
      </Button>
      {isPending && <CircularProgress color="success" />}
      {isError && <Alert severity="error">A busz nem található vagy nem sikerült betölteni.</Alert>}
      {bus && (
        <Paper sx={busCrudStyles.pageCard}>
          <Box sx={busCrudStyles.header}>
            <Typography variant="h4" component="h1" fontWeight={800}>Busz adatai</Typography>
            <Button variant="contained" startIcon={<EditOutlinedIcon />} onClick={() => navigate(`/buses/${bus.id}/edit`)} sx={busCrudStyles.primaryButton}>
              Szerkesztés
            </Button>
          </Box>
          <Stack spacing={2.5}>
            {details.map(({ label, value }) => (
              <Box key={label} sx={busCrudStyles.detailRow}>
                <Typography variant="caption" sx={{ color: "#9fc0ca", letterSpacing: 0.5 }}>{label}</Typography>
                <Typography sx={{ color: "#fff", fontSize: "1.1rem", fontWeight: 600 }}>{value}</Typography>
              </Box>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
