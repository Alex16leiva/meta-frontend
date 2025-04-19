
import { useState, useMemo, useEffect } from "react"
import PropTypes from "prop-types"
import {
    Box,
    Paper,
    Typography,
    useTheme,
    FormGroup,
    FormControlLabel,
    Checkbox,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    InputAdornment,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Tooltip,
} from "@mui/material"
import { ChevronDown, Search, X, Filter, Download, Printer, RefreshCw } from "lucide-react"

// Define the DataTable component
export const PivotTableControl = ({
    data,
    columns,
    title = "Datos",
    filterableFields = null, // Campos que se pueden filtrar (null = todos)
    defaultPageSize = 10,
    filterPanelWidth = 280,
    emptyMessage = "No hay datos disponibles",
    exportable = true,
}) => {
    const theme = useTheme()

    // Pagination state
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(defaultPageSize)

    // Filter panel state
    const [filters, setFilters] = useState({})
    const [expandedFilters, setExpandedFilters] = useState({})

    // Búsqueda global
    const [globalSearch, setGlobalSearch] = useState("")

    // Extract all unique values for each column for filtering
    const filterOptions = useMemo(() => {
        if (!data || !data.length) return {}

        const options = {}

        // Determine which fields to include in filters
        const fieldsToFilter = filterableFields || columns.map((col) => col.field)

        // Get unique values for each field
        fieldsToFilter.forEach((field) => {
            if (data[0] && field in data[0]) {
                options[field] = [...new Set(data.map((item) => item[field]))]
            }
        })

        return options
    }, [data, columns, filterableFields])

    // Initialize filters and expanded state
    useEffect(() => {
        if (Object.keys(filterOptions).length > 0 && Object.keys(filters).length === 0) {
            const initialFilters = {}
            const initialExpanded = {}

            Object.keys(filterOptions).forEach((field) => {
                initialFilters[field] = filterOptions[field].reduce((acc, value) => {
                    acc[value] = true
                    return acc
                }, {})

                // Set first two filters as expanded by default
                initialExpanded[field] = Object.keys(initialExpanded).length < 1
            })

            setFilters(initialFilters)
            setExpandedFilters(initialExpanded)
        }
    }, [filterOptions, filters])

    // Primero aplicamos solo la búsqueda global para obtener los datos filtrados por texto
    const textFilteredData = useMemo(() => {
        if (!data || !data.length) return data

        if (!globalSearch) return data

        const searchTerm = globalSearch.toLowerCase()
        const filterableColumns = Object.keys(filterOptions)

        return data.filter((item) => {
            // Buscar solo en las columnas que están en los filtros
            return filterableColumns.some((field) => {
                const value = item[field]
                // Solo buscar en valores de texto
                return typeof value === "string" && value.toLowerCase().includes(searchTerm)
            })
        })
    }, [data, globalSearch, filterOptions])

    // Obtener las opciones de filtro disponibles basadas en los datos filtrados por texto
    const availableFilterOptions = useMemo(() => {
        if (!textFilteredData || !textFilteredData.length) return {}

        const options = {}

        Object.keys(filterOptions).forEach((field) => {
            options[field] = [...new Set(textFilteredData.map((item) => item[field]))]
        })

        return options
    }, [textFilteredData, filterOptions])

    // Actualizar automáticamente los filtros cuando cambia la búsqueda
    useEffect(() => {
        if (globalSearch && Object.keys(availableFilterOptions).length > 0) {
            // Crear una copia de los filtros actuales
            const updatedFilters = { ...filters }

            // Para cada campo de filtro
            Object.keys(updatedFilters).forEach((field) => {
                // Obtener las opciones disponibles para este campo después de la búsqueda
                const availableOptions = availableFilterOptions[field] || []

                // Para cada valor en el filtro actual
                Object.keys(updatedFilters[field]).forEach((value) => {
                    // Si el valor no está disponible después de la búsqueda, desactivarlo
                    if (!availableOptions.includes(value)) {
                        updatedFilters[field][value] = false
                    }
                })
            })

            // Actualizar los filtros
            setFilters(updatedFilters)
        }
    }, [globalSearch, availableFilterOptions])

    // Luego aplicamos los filtros de checkbox a los datos ya filtrados por texto
    const filteredData = useMemo(() => {
        if (!textFilteredData || !textFilteredData.length) return textFilteredData

        if (Object.keys(filters).length === 0) return textFilteredData

        return textFilteredData.filter((item) => {
            // Check each field's filters
            return Object.keys(filters).every((field) => {
                // If the item has this field and the field's value is selected in filters
                return item[field] !== undefined && filters[field][item[field]]
            })
        })
    }, [textFilteredData, filters])

    // Handle filter change
    const handleFilterChange = (field, value, checked) => {
        setFilters((prev) => ({
            ...prev,
            [field]: {
                ...prev[field],
                [value]: checked,
            },
        }))
    }

    // Toggle filter expansion
    const handleToggleFilterExpansion = (field) => {
        setExpandedFilters((prev) => ({
            ...prev,
            [field]: !prev[field],
        }))
    }

    // Count selected filters for a field
    const getSelectedCount = (field) => {
        if (!filters[field]) return 0

        // Si hay una búsqueda activa, contar solo las opciones disponibles
        if (globalSearch && availableFilterOptions[field]) {
            return availableFilterOptions[field].filter((value) => filters[field][value]).length
        }

        // Si no hay búsqueda, contar todas las opciones seleccionadas
        return Object.values(filters[field]).filter(Boolean).length
    }

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(Number.parseInt(event.target.value, 10))
        setPage(0)
    }

    // Export data to CSV
    const exportToCSV = () => {
        if (!filteredData || !filteredData.length) return

        // Get column headers
        const headers = columns.map((col) => col.header || col.field)

        // Get data rows
        const rows = filteredData.map((item) => columns.map((col) => item[col.field]))

        // Create CSV content
        const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n")

        // Create download link
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.setAttribute("href", url)
        link.setAttribute("download", `${title.toLowerCase().replace(/\s+/g, "-")}.csv`)
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    // Limpiar la búsqueda y restaurar todos los filtros
    const clearSearch = () => {
        setGlobalSearch("")

        // Restaurar los filtros a su estado original (todos seleccionados)
        const restoredFilters = {}
        Object.keys(filterOptions).forEach((field) => {
            restoredFilters[field] = filterOptions[field].reduce((acc, value) => {
                acc[value] = true
                return acc
            }, {})
        })

        setFilters(restoredFilters)
        setPage(0) // Resetear a la primera página
    }

    // Función para limpiar todos los filtros y mostrar la data original
    const resetAllFilters = () => {
        // Limpiar la búsqueda global
        setGlobalSearch("")

        // Restaurar todos los filtros a su estado original (todos seleccionados)
        const restoredFilters = {}
        Object.keys(filterOptions).forEach((field) => {
            restoredFilters[field] = filterOptions[field].reduce((acc, value) => {
                acc[value] = true
                return acc
            }, {})
        })

        setFilters(restoredFilters)
        setPage(0) // Resetear a la primera página
    }

    // Agregar un manejador para la búsqueda global
    const handleGlobalSearchChange = (event) => {
        const newSearchValue = event.target.value
        setGlobalSearch(newSearchValue)

        // Si el campo de búsqueda queda vacío, restaurar los filtros a su estado original
        if (newSearchValue === "") {
            // Restaurar los filtros a su estado original (todos seleccionados)
            const restoredFilters = {}
            Object.keys(filterOptions).forEach((field) => {
                restoredFilters[field] = filterOptions[field].reduce((acc, value) => {
                    acc[value] = true
                    return acc
                }, {})
            })

            setFilters(restoredFilters)
        }

        setPage(0) // Resetear a la primera página cuando se busca
    }

    // If no data, show empty message
    if (!data || !data.length) {
        return (
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    textAlign: "center",
                    bgcolor: theme.palette.background.paper,
                }}
            >
                <Typography color="text.secondary">{emptyMessage}</Typography>
            </Paper>
        )
    }

    // Calculate pagination
    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    return (
        <Paper elevation={2}>
            <Box
                sx={{
                    p: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Typography variant="h6">{title}</Typography>

                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        {filteredData.length} de {data.length} registros
                    </Typography>

                    {exportable && (
                        <Tooltip title="Exportar a CSV">
                            <IconButton size="small" onClick={exportToCSV}>
                                <Download size={18} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
            </Box>

            <Grid container>
                {/* Filter Panel - Always visible */}
                <Grid
                    item
                    sx={{
                        width: filterPanelWidth,
                        borderRight: `1px solid ${theme.palette.divider}`,
                        height: "calc(100% - 52px)", // Altura total menos la altura del encabezado y paginación
                        overflow: "auto",
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ display: "flex", alignItems: "center" }}>
                                <Filter size={16} style={{ marginRight: "8px" }} /> Filtros
                            </Typography>

                            <Tooltip title="Limpiar todos los filtros">
                                <IconButton
                                    size="small"
                                    onClick={resetAllFilters}
                                    color="primary"
                                    sx={{
                                        border: `1px solid ${theme.palette.primary.main}`,
                                        "&:hover": {
                                            backgroundColor: theme.palette.primary.main,
                                            color: theme.palette.primary.contrastText,
                                        },
                                    }}
                                >
                                    <RefreshCw size={14} />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        {/* Campo de búsqueda movido debajo del título "Filtros" */}
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Buscar en columnas filtradas..."
                            value={globalSearch}
                            onChange={handleGlobalSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search size={16} />
                                    </InputAdornment>
                                ),
                                endAdornment: globalSearch ? (
                                    <InputAdornment position="end">
                                        <IconButton size="small" onClick={clearSearch}>
                                            <X size={14} />
                                        </IconButton>
                                    </InputAdornment>
                                ) : null,
                            }}
                            sx={{ mb: 2 }}
                        />

                        <Box sx={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
                            {Object.keys(filterOptions).map((field) => (
                                <Accordion
                                    key={field}
                                    expanded={expandedFilters[field] || false}
                                    onChange={() => handleToggleFilterExpansion(field)}
                                    sx={{ mb: 1 }}
                                    disableGutters
                                >
                                    <AccordionSummary expandIcon={<ChevronDown />}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                                            <Typography>{columns.find((col) => col.field === field)?.header || field}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                {getSelectedCount(field)}/
                                                {globalSearch ? availableFilterOptions[field]?.length || 0 : filterOptions[field]?.length}
                                            </Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ padding: 1, maxHeight: "300px", overflow: "auto" }}>
                                        <FormGroup>
                                            {/* Mostrar todas las opciones, pero desactivar las que no están disponibles */}
                                            {filterOptions[field]?.map((value) => {
                                                const isAvailable =
                                                    !globalSearch ||
                                                    (availableFilterOptions[field] && availableFilterOptions[field].includes(value))

                                                return (
                                                    <FormControlLabel
                                                        key={value}
                                                        control={
                                                            <Checkbox
                                                                checked={filters[field]?.[value] || false}
                                                                onChange={(e) => handleFilterChange(field, value, e.target.checked)}
                                                                size="small"
                                                                disabled={!isAvailable}
                                                            />
                                                        }
                                                        label={
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: isAvailable ? "text.primary" : "text.disabled",
                                                                    textDecoration: isAvailable ? "none" : "line-through",
                                                                }}
                                                            >
                                                                {value}
                                                            </Typography>
                                                        }
                                                    />
                                                )
                                            })}
                                        </FormGroup>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </Box>
                </Grid>

                {/* Table */}
                <Grid item sx={{ flexGrow: 1, width: `calc(100% - ${filterPanelWidth}px)` }}>
                    <TableContainer sx={{ maxHeight: "calc(100vh - 200px)" }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.field}
                                            align={column.align || "left"}
                                            style={{ minWidth: column.minWidth, width: column.width }}
                                        >
                                            {column.header || column.field}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedData.map((row, index) => (
                                    <TableRow hover tabIndex={-1} key={index}>
                                        {columns.map((column) => {
                                            const value = row[column.field]
                                            return (
                                                <TableCell key={column.field} align={column.align || "left"}>
                                                    {column.render ? column.render(value, row) : value}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                ))}

                                {paginatedData.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} align="center">
                                            No se encontraron resultados
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Filas por página:"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
                    />
                </Grid>
            </Grid>
        </Paper>
    )
}

PivotTableControl.propTypes = {
    // Data array containing objects
    data: PropTypes.arrayOf(PropTypes.object).isRequired,

    // Column definitions
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            field: PropTypes.string.isRequired,
            header: PropTypes.string,
            width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
            minWidth: PropTypes.number,
            align: PropTypes.oneOf(["left", "right", "center"]),
            render: PropTypes.func,
        }),
    ).isRequired,
    // Table title
    title: PropTypes.string,
    // Fields that can be filtered (if null, all fields can be filtered)
    filterableFields: PropTypes.arrayOf(PropTypes.string),
    // Default page size
    defaultPageSize: PropTypes.number,
    // Width of the filter panel
    filterPanelWidth: PropTypes.number,
    // Message to display when no data is available
    emptyMessage: PropTypes.string,
    // Whether to show export button
    exportable: PropTypes.bool,
    // Whether to show print button
    printable: PropTypes.bool,
}