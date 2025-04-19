import React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";

export const DateTimePickerControl = ({ label, value, onChange, disabled = false }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
                label={label || "Selecciona fecha y hora"}
                value={value}
                onChange={onChange}
                disabled={disabled}
                renderInput={(params) => <TextField {...params}
                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{
                        height: '40px',
                        "& .MuiInputBase-root": {
                            padding: '5px 10px',
                            lineHeight: 1.5,
                            fontSize: '14px',
                        },
                    }}
                />}
            />
        </LocalizationProvider>

    );
};
