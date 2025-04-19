"use client"

import {
    Box,
    Container,
    Typography,
    Paper,
    CssBaseline,
    Chip,
    Avatar,
} from "@mui/material"
import { PivotTableControl } from "../PivotTableControl"
import './styles.css'
export const PivotTableUseExample = () => {

    // Sample user data
    const userData = [
        {
            id: 1,
            name: "Juan Pérez",
            email: "juan.perez@example.com",
            role: "Admin",
            department: "IT",
            status: "Active",
            lastLogin: "2023-05-15",
        },
        {
            id: 2,
            name: "María García",
            email: "maria.garcia@example.com",
            role: "User",
            department: "Marketing",
            status: "Active",
            lastLogin: "2023-05-14",
        },
        {
            id: 3,
            name: "Carlos López",
            email: "carlos.lopez@example.com",
            role: "Editor",
            department: "Content",
            status: "Inactive",
            lastLogin: "2023-04-28",
        },
        {
            id: 4,
            name: "Ana Martínez",
            email: "ana.martinez@example.com",
            role: "Admin",
            department: "HR",
            status: "Active",
            lastLogin: "2023-05-12",
        },
        {
            id: 5,
            name: "Roberto Sánchez",
            email: "roberto.sanchez@example.com",
            role: "User",
            department: "Sales",
            status: "Active",
            lastLogin: "2023-05-10",
        },
        {
            id: 6,
            name: "Laura Rodríguez",
            email: "laura.rodriguez@example.com",
            role: "User",
            department: "Marketing",
            status: "Active",
            lastLogin: "2023-05-09",
        },
        {
            id: 7,
            name: "Miguel Fernández",
            email: "miguel.fernandez@example.com",
            role: "Editor",
            department: "Content",
            status: "Active",
            lastLogin: "2023-05-08",
        },
        {
            id: 8,
            name: "Carmen Gómez",
            email: "carmen.gomez@example.com",
            role: "User",
            department: "Sales",
            status: "Inactive",
            lastLogin: "2023-04-15",
        },
        {
            id: 9,
            name: "Javier Torres",
            email: "javier.torres@example.com",
            role: "Admin",
            department: "IT",
            status: "Active",
            lastLogin: "2023-05-07",
        },
        {
            id: 10,
            name: "Isabel Díaz",
            email: "isabel.diaz@example.com",
            role: "User",
            department: "HR",
            status: "Active",
            lastLogin: "2023-05-06",
        },
        {
            id: 11,
            name: "Francisco Ruiz",
            email: "francisco.ruiz@example.com",
            role: "Editor",
            department: "Content",
            status: "Active",
            lastLogin: "2023-05-05",
        },
        {
            id: 12,
            name: "Elena Vargas",
            email: "elena.vargas@example.com",
            role: "User",
            department: "Marketing",
            status: "Inactive",
            lastLogin: "2023-04-10",
        },
        {
            id: 13,
            name: "Antonio Moreno",
            email: "antonio.moreno@example.com",
            role: "User",
            department: "Sales",
            status: "Active",
            lastLogin: "2023-05-04",
        },
        {
            id: 14,
            name: "Sofía Castro",
            email: "sofia.castro@example.com",
            role: "Admin",
            department: "HR",
            status: "Active",
            lastLogin: "2023-05-03",
        },
        {
            id: 15,
            name: "Pedro Ortiz",
            email: "pedro.ortiz@example.com",
            role: "User",
            department: "IT",
            status: "Active",
            lastLogin: "2023-05-02",
        },
    ]

    // Column definitions
    const columns = [
        {
            field: "name",
            header: "Nombre",
            minWidth: 150,
            render: (value) => (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 1, width: 32, height: 32 }}>{value.charAt(0)}</Avatar>
                    <Typography variant="body2">{value}</Typography>
                </Box>
            ),
        },
        { field: "email", header: "Correo Electrónico", minWidth: 200 },
        {
            field: "role",
            header: "Rol",
            minWidth: 100,
            render: (value) => {
                let color = "default"
                if (value === "Admin") color = "error"
                else if (value === "Editor") color = "primary"
                else if (value === "User") color = "success"

                return <Chip label={value} color={color} size="small" />
            },
        },
        { field: "department", header: "Departamento", minWidth: 120 },
        {
            field: "status",
            header: "Estado",
            minWidth: 100,
            render: (value) => (
                <Chip label={value} color={value === "Active" ? "success" : "default"} size="small" variant="outlined" />
            ),
        },
        { field: "lastLogin", header: "Último Acceso", minWidth: 120 },
    ]

    // Campos filtrables específicos (solo se usarán si filterMode === 'selected')
    const selectedFilterFields = ["role", "department", "status"]

    return (
        <div className="main-container">
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                        <Typography variant="h4" component="h1">
                            Gestión de Usuarios
                        </Typography>
                    </Box>
                    <Box sx={{ height: '520', width: '100%' }}>
                        <PivotTableControl
                            data={userData}
                            columns={columns}
                            title="Usuarios del Sistema"
                            filterableFields={selectedFilterFields}
                            defaultPageSize={10}
                            filterPanelWidth={250}
                        />
                    </Box>
                </Paper>
            </Container>
        </div>
    )
}

