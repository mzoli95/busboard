import {
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import type { Bus } from "../data/busCrud.types";
import { busStatusLabels } from "../data/busCrud.data";
import { formatPlate } from "../utils/plate";
import { busCrudStyles } from "../style/busCrud.style";

type Props = {
  buses: Bus[];
  onView: (bus: Bus) => void;
  onEdit: (bus: Bus) => void;
  onDelete: (bus: Bus) => void;
};

export default function BusTable({ buses, onView, onEdit, onDelete }: Props) {
  return (
    <TableContainer component={Paper} sx={busCrudStyles.tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={busCrudStyles.plateHeaderCell}>Rendszám</TableCell>
            <TableCell>Modell</TableCell>
            <TableCell>Állapot</TableCell>
            <TableCell align="right">
              Kapacitás
              <Tooltip title="Férőhelyek száma (ülő- és állóhelyek összesen)">
                <IconButton
                  size="small"
                  aria-label="Mit jelent a kapacitás?"
                  sx={busCrudStyles.capacityInfoButton}
                >
                  <InfoOutlinedIcon sx={{ fontSize: 15 }} />
                </IconButton>
              </Tooltip>
            </TableCell>
            <TableCell align="right">Műveletek</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {buses.map((bus) => (
            <TableRow key={bus.id}>
              <TableCell sx={busCrudStyles.plateCell}>
                {formatPlate(bus.plate)}
              </TableCell>
              <TableCell>{bus.model}</TableCell>
              <TableCell>{busStatusLabels[bus.status]}</TableCell>
              <TableCell align="right">{bus.capacity}</TableCell>
              <TableCell align="right">
                <Stack direction="row" justifyContent="flex-end">
                  <Tooltip title="Megtekintés">
                    <IconButton
                      aria-label={`${bus.plate} megtekintése`}
                      onClick={() => onView(bus)}
                      sx={{ color: "#d5eeea" }}
                    >
                      <VisibilityOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Szerkesztés">
                    <IconButton
                      aria-label={`${bus.plate} szerkesztése`}
                      onClick={() => onEdit(bus)}
                      sx={{ color: "#d5eeea" }}
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Törlés">
                    <IconButton
                      aria-label={`${bus.plate} törlése`}
                      onClick={() => onDelete(bus)}
                      sx={{ color: "#ff8d8d" }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </TableCell>
            </TableRow>
          ))}

          {buses.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>Még nincs busz a listában.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
