const inputLabel = {
  "& .MuiInputLabel-root": { color: "#b7c8cf" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#1be29a" },
  "& .MuiFormHelperText-root": { color: "#b7c8cf" },
};

export const busCrudStyles = {
  page: { maxWidth: 1200, mx: "auto", p: 3 },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2,
    mb: 3,
  },
  tableContainer: {
    bgcolor: "#123b4d",
    border: "1px solid rgba(27,226,154,0.25)",
    borderRadius: 3,
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
    "& .MuiTableCell-root": {
      color: "#e8f5f3",
      borderColor: "rgba(255,255,255,0.1)",
    },
    "& .MuiTableHead-root": { bgcolor: "rgba(27,226,154,0.08)" },
    "& .MuiTableHead-root .MuiTableCell-root": {
      color: "#1be29a",
      fontWeight: 700,
    },
    "& .MuiTableBody-root .MuiTableRow-root:hover .MuiTableCell-root": {
      bgcolor: "#174b5c",
    },
  },
  plateHeaderCell: {
    position: "sticky",
    left: 0,
    zIndex: 2,
    minWidth: 125,
    bgcolor: "#174859",
  },
  plateCell: {
    position: "sticky",
    left: 0,
    zIndex: 1,
    minWidth: 125,
    bgcolor: "#123b4d",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  capacityInfoButton: {
    ml: 0.5,
    p: 0.25,
    color: "#facc15",
    verticalAlign: "middle",
  },
  dialogPaper: {
    bgcolor: "#123b4d",
    color: "#fff",
    border: "1px solid rgba(27,226,154,0.3)",
    borderRadius: 3,
  },
  detailRow: {
    pb: 1.5,
    borderBottom: "1px solid rgba(255,255,255,0.12)",
  },
  form: {
    pt: 1,
  },
  textField: {
    ...inputLabel,
    "& .MuiOutlinedInput-root": { color: "#fff" },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.25)" },
    "& .MuiSvgIcon-root": { color: "#fff" },
  },
  capacityField: {
    ...inputLabel,
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      bgcolor: "rgba(255,255,255,0.05)",
      borderRadius: 2,
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1be29a" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1be29a" },
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.25)" },
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "& input[type=number]": { MozAppearance: "textfield" },
  },
  statusField: {
    ...inputLabel,
    "& .MuiOutlinedInput-root": {
      color: "#fff",
      bgcolor: "rgba(255,255,255,0.05)",
      borderRadius: 2,
      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1be29a" },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1be29a" },
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.25)" },
    "& .MuiSelect-icon": { color: "#1be29a" },
  },
  statusMenu: {
    mt: 0.5,
    bgcolor: "#123b4d",
    color: "#e8f5f3",
    border: "1px solid rgba(27,226,154,0.3)",
    borderRadius: 2,
    boxShadow: "0 12px 28px rgba(0,0,0,0.35)",
    "& .MuiMenuItem-root": {
      mx: 0.5,
      my: 0.25,
      borderRadius: 1,
      "&:hover": { bgcolor: "rgba(27,226,154,0.12)" },
      "&.Mui-selected": { bgcolor: "rgba(27,226,154,0.2)" },
      "&.Mui-selected:hover": { bgcolor: "rgba(27,226,154,0.26)" },
    },
  },
  primaryButton: {
    bgcolor: "#1be29a",
    color: "#07352c",
    fontWeight: 700,
    "&:hover": { bgcolor: "#15c987" },
  },
};
