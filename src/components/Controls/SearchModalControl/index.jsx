import React, { useState } from "react";
import PropTypes from "prop-types";
import {
    TextField,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { restClient } from "../../../services/restClient";
import { useCallback } from "react";
import { useEffect } from "react";

export const SearchModalControl = ({
    value,
    onChange,
    columns,
    valueField,
    apiUrl,
    pageSizeOptions = [5, 10, 25, 50],
    isReadOnly = false
}) => {
    const [open, setOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [rows, setRows] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [buscarFromKeydown, serBuscarFromKeydown] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setSearchText("")
        setOpen(false);
    }

    const fetch = useCallback(async (pageIndex, pageSize) => {
        const request = {
            queryInfo: {
                pageIndex,
                pageSize,
                sortFields: ["fechaTransaccion"],
                ascending: false,
                predicate: searchText ? `${valueField}.Contains(@0)` : "",
                paramValues: searchText ? [searchText] : [],
            },
        };


        const response = await restClient.httpPost(apiUrl, request);
        if (response) {
            setTotalItems(response.totalItems);
            setRows(response.items);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiUrl, valueField, buscarFromKeydown, open]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        serBuscarFromKeydown(searchText)
        fetch(pageIndex, pageSize);
    }

    useEffect(() => {
        if (open) {
            fetch(pageIndex, pageSize);
        }
    }, [open, fetch, pageIndex, pageSize]);

    const handleRowDoubleClick = (params) => {
        onChange(params.row[valueField]);
        handleClose();
    };

    const handleSelect = () => {
        if (selectedRow) {
            onChange(selectedRow[valueField]);
        }
        handleClose();
    };

    const onChangePage = (pageInfo) => {
        setPageIndex(pageInfo.page);
        setPageSize(pageInfo.pageSize);
        fetch(pageInfo.page, pageInfo.pageSize);
    };

    return (
        <>
            <TextField
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={isReadOnly}
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={handleOpen} color="primary">
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
                fullWidth
                size="small"
            />

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Buscar</DialogTitle>
                <DialogContent>
                    <Box display="flex" alignItems="center" gap={1}>

                        <TextField
                            fullWidth
                            placeholder="Buscar..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyPress}

                            margin="dense"
                            size="small"
                        />
                    </Box>
                    <Box sx={{ height: 320, width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            rowCount={totalItems}
                            pageSizeOptions={pageSizeOptions}
                            onPaginationModelChange={onChangePage}
                            paginationMode="server"
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize,
                                        page: pageIndex,
                                    },
                                },
                            }}
                            onRowDoubleClick={handleRowDoubleClick}
                            onRowSelectionModelChange={(ids) =>
                                setSelectedRow(rows.find((row) => row[valueField] === ids[0]))
                            }
                            getRowId={(row) => row[valueField]}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleSelect} disabled={!selectedRow}>Seleccionar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

SearchModalControl.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    valueField: PropTypes.string.isRequired,
};

