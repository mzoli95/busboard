import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import type { Bus } from "../data/busCrud.types";
import { busStatusLabels } from "../data/busCrud.data";
import { formatPlate } from "../utils/plate";
import { busCrudStyles } from "../style/busCrud.style";

type Props = {
  bus: Bus | null;
  onClose: () => void;
  onEdit: (bus: Bus) => void;
};

export default function BusDetailsDialog({ bus, onClose, onEdit }: Props) {
  const details = bus
    ? [
        { label: "Rendszám", value: formatPlate(bus.plate) },
        { label: "Modell", value: bus.model },
        { label: "Állapot", value: busStatusLabels[bus.status] },
        { label: "Férőhelyek", value: `${bus.capacity} fő` },
      ]
    : [];

  return (
    <Dialog
      open={bus !== null}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{ paper: { sx: busCrudStyles.dialogPaper } }}
    >
      <DialogTitle fontWeight={800}>Busz adatai</DialogTitle>
      <DialogContent>
        <Stack spacing={2.5} sx={{ pt: 1 }}>
          {details.map(({ label, value }) => (
            <Box key={label} sx={busCrudStyles.detailRow}>
              <Typography variant="caption" sx={{ color: "#9fc0ca", letterSpacing: 0.5 }}>
                {label}
              </Typography>
              <Typography sx={{ color: "#fff", fontSize: "1.1rem", fontWeight: 600 }}>
                {value}
              </Typography>
            </Box>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ color: "#d5eeea" }}>
          Bezárás
        </Button>
        <Button
          variant="contained"
          disabled={!bus}
          onClick={() => bus && onEdit(bus)}
          sx={busCrudStyles.primaryButton}
        >
          Szerkesztés
        </Button>
      </DialogActions>
    </Dialog>
  );
}
