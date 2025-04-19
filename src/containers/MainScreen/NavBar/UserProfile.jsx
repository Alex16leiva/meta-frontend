import React, { useState } from "react";
import { Box, Typography, TextField, Button, Drawer, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const UserProfile = ({ open, handleClose, user, onSavePassword }) => {
    const [password, setPassword] = useState("");

    const handleSave = () => {
        onSavePassword(password);
        handleClose();
    };

    return (
        <Drawer anchor="right" open={open} onClose={handleClose} sx={{ width: 400 }}>
            <Box sx={{ width: 400, p: 3, display: "flex", flexDirection: "column", height: "100vh" }}>
                {/* Encabezado */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="h6">Perfil de Usuario</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider />

                {/* Información del Usuario */}
                <Box sx={{ mt: 3 }}>
                    <TextField fullWidth label="Usuario ID" value={user.usuarioId} InputProps={{ readOnly: true }} variant="filled" margin="dense" />
                    <TextField fullWidth label="Nombre" value={user.nombre} InputProps={{ readOnly: true }} variant="filled" margin="dense" />
                    <TextField fullWidth label="Apellido" value={user.apellido} InputProps={{ readOnly: true }} variant="filled" margin="dense" />
                    <TextField fullWidth label="Rol ID" value={user.rolId} InputProps={{ readOnly: true }} variant="filled" margin="dense" />
                </Box>

                {/* Cambio de Contraseña */}
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle1">Cambiar Contraseña</Typography>
                    <TextField
                        fullWidth
                        type="password"
                        label="Nueva Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        variant="outlined"
                        margin="dense"
                    />
                </Box>

                {/* Botones */}
                <Box sx={{ mt: "auto", display: "flex", justifyContent: "space-between" }}>
                    <Button onClick={handleClose} sx={{ mr: 2 }}>
                        Cancelar
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Guardar
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};