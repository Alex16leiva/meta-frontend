import React, { useState } from "react";
import { SearchModalControl } from "../SearchModalControl";




const columns = [
    { field: "usuarioId", headerName: "Usuario", width: 150 },
    { field: "nombre", headerName: "Nombre", width: 150 },
    { field: "apellido", headerName: "Apellido", width: 150 },
    { field: "rolId", headerName: "Rol", width: 150 },
    { field: "activo", headerName: "Activo", width: 100, type: "boolean" }
];

export const SearchControlModalUseExample = () => {
    const [selectedValue, setSelectedValue] = useState("");

    return (
        <div style={{ width: 400, margin: "20px auto" }}>
            <h3>Buscar Usuario</h3>
            <SearchModalControl
                value={selectedValue}
                onChange={setSelectedValue}
                columns={columns}
                valueField="usuarioId"
                apiUrl={'user/obtener-usuarios'}
                isReadOnly={true}
            />
            <p>Valor seleccionado: {selectedValue}</p>


        </div>
    );
};

