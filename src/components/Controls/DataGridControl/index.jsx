import React from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import PropTypes from "prop-types";

export const DataGridControl = ({
    rows,
    columns,
    totalItems,
    onChangePage,
    pageSize,
    pageIndex,
    rowId,
    showToolbar = true,
    fileExcelName,
    pageSizeOptions = [5, 10, 25, 50],
    handleRowDoubleClick,
    handleRowSelectionChange,
}) => {

    const CustomToolbar = () => (
        <GridToolbarContainer>
            <GridToolbarExport
                printOptions={{ disableToolbarButton: true }}
                csvOptions={{ fileName: fileExcelName, utf8WithBom: true }}
            />
        </GridToolbarContainer>
    );

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            rowCount={totalItems}
            pageSizeOptions={pageSizeOptions}
            onPaginationModelChange={onChangePage}
            paginationMode="server"
            checkboxSelection
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize,
                        page: pageIndex,
                    },
                },
            }}
            slots={showToolbar ? { toolbar: CustomToolbar } : {}}
            getRowId={(row) => row[rowId] || row.id}
            onRowDoubleClick={handleRowDoubleClick}
            onRowSelectionModelChange={handleRowSelectionChange}
        />
    );
};

DataGridControl.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    totalItems: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageIndex: PropTypes.number.isRequired,
    rowId: PropTypes.string,
    showToolbar: PropTypes.bool,
    fileExcelName: PropTypes.string,
    pageSizeOptions: PropTypes.array,
    handleRowDoubleClick: PropTypes.func,
    handleRowSelectionChange: PropTypes.func,
};

