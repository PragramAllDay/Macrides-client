import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";

export default function TimePickers(props) {
  const { value, onChange } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <MobileTimePicker
          label="Timer"
          value={dayjs(value)}
          sx={{ borderRadius: "0" }}
          onChange={onChange}
          renderInput={(params) => (
            <TextField name="time" fullWidth {...params} />
          )}
        />
      </Stack>
    </LocalizationProvider>
  );
}
