import { useState, type FormEvent } from "react";
import { Box, Stack, TextField } from "@mui/material";
import type { NewBoardTask } from "../data/board.types";
import { boardStyles } from "../style/board.style";

type Props = {
  id: string;
  initialValue: NewBoardTask;
  onSubmit: (input: NewBoardTask) => void;
};

export default function TaskForm({ id, initialValue, onSubmit }: Props) {
  const [form, setForm] = useState<NewBoardTask>(initialValue);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input: NewBoardTask = {
      title: form.title.trim(),
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim(),
    };

    if (input.title && input.shortDescription) onSubmit(input);
  }

  return (
    <Box component="form" id={id} onSubmit={handleSubmit} sx={boardStyles.form}>
      <Stack spacing={2}>
        <TextField
          autoFocus
          label="Feladat címe"
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          required
          fullWidth
          slotProps={{ htmlInput: { maxLength: 120 } }}
          sx={boardStyles.titleField}
        />
        <TextField
          label="Rövid leírás"
          value={form.shortDescription}
          onChange={(event) =>
            setForm({ ...form, shortDescription: event.target.value })
          }
          required
          fullWidth
          helperText="Ez jelenik meg a kártyán."
          slotProps={{ htmlInput: { maxLength: 160 } }}
          sx={boardStyles.titleField}
        />
        <TextField
          label="Részletes leírás"
          value={form.description}
          onChange={(event) => setForm({ ...form, description: event.target.value })}
          multiline
          minRows={4}
          fullWidth
          slotProps={{ htmlInput: { maxLength: 2000 } }}
          sx={boardStyles.titleField}
        />
      </Stack>
    </Box>
  );
}
