"user Management"
import { useCallback, useEffect, useState } from "react"
import { utilsValidator } from "../../Helpers/utils/utilsValidator"
import { restClient } from "../../services/restClient"
import { DataGridControl } from "../../components/Controls/DataGridControl"
import { GridActionsCellItem } from "@mui/x-data-grid"
import { ToastNotificationService } from "../../components/Controls/Notification/Notification"
import { StatusBadge } from "./StatusBadge"
import { Box, TextField } from "@mui/material"

export default function UserManagement() {
    const [users, setUsers] = useState([])
    const [showUserForm, setShowUserForm] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [callService, setCallService] = useState(0);
    const [roles, setRoles] = useState([]);

    const fetchRoles = useCallback(async () => {
        restClient.httpGet('user/obtener-roles', {})
            .then(response => {
                setRoles(response);
            })
    }, [])

    useEffect(() => {
        fetchRoles()
    }, [fetchRoles])

    const columns = [
        { field: 'usuarioId', headerName: 'Usuario Id', width: 150 },
        { field: 'nombre', headerName: 'Nombre', width: 150 },
        { field: 'apellido', headerName: 'Apellido', width: 200 },
        { field: 'rolId', headerName: 'Rol Id', width: 200 },
        {
            field: 'activo', headerName: 'Estado', with: 150,
            renderCell: (params) => <StatusBadge status={params.value}>
                {params.value ? "Activo" : "Inactivo"}
            </StatusBadge>
        },
        {
            field: 'fechaTransaccion',
            headerName: 'Fecha Modificación',
            width: 180,
            type: 'dateTime',
            valueGetter: (value) => value ? new Date(value) : null,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Editar',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id, row }) => [
                <GridActionsCellItem
                    key={id}
                    icon={<i className="icon-edit"></i>}
                    label="Editar"
                    className="textPrimary"
                    onClick={() => handleEditUser(row)}
                    color="inherit"
                />
            ]
        }
    ];

    const fetchUsers = useCallback(async (pageIndex, pageSize) => {
        const request = {
            queryInfo: {
                pageIndex,
                pageSize,
                sortFields: ['FechaTransaccion'],
                ascending: false,
                predicate: utilsValidator.isNullOrEmpty(searchTerm) ? '' : 'usuarioId.Contains(@0)',
                paramValues: utilsValidator.isNullOrEmpty(searchTerm) ? [] : [searchTerm],
            }
        };

        const response = await restClient.httpPost('user/obtener-usuarios', request);
        if (response) {
            setTotalItems(response.totalItems);
            setUsers(response.items);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [callService, pageIndex, pageSize]);

    useEffect(() => {
        fetchUsers(pageIndex, pageSize);
    }, [fetchUsers, pageIndex, pageSize]);

    const onChangePage = (pageInfo) => {
        setPageIndex(pageInfo.page);
        setPageSize(pageInfo.pageSize);
        fetchUsers(pageInfo.page, pageInfo.pageSize);
    };

    const handleSearch = () => {
        setCallService((item) => item + 1);
        console.log(callService);

        fetchUsers(pageIndex, pageSize);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleAddUser = () => {
        setCurrentUser(null)
        setShowUserForm(true)
    }

    const handleEditUser = (user) => {
        setCurrentUser(user)
        setShowUserForm(true)
    }

    const handleSaveUser = (userData) => {
        console.log('Saving user data: ', userData);

        var request = {
            usuario: {
                rolId: userData.rolId,
                usuarioId: userData.usuarioId,
                nombre: userData.nombre,
                apellido: userData.apellido,
                contrasena: userData.password,
                editarContrasena: userData.password != "",
                activo: userData.activo
            }
        }

        const url = currentUser ? 'user/editar-usuario' : 'user/crear-usuario';

        restClient.httpPost(url, request).then(response => {
            if (!utilsValidator.hasErrorResponse(response)) {
                console.log(response);

                const mensaje = currentUser ? "Usuario Editado" : "Usuario Creado"
                ToastNotificationService.Success(mensaje);
                setShowUserForm(false);
                fetchUsers(pageIndex, pageSize);
            }

        });

    }

    return (
        <div className="management-container">
            {!showUserForm ? (
                <div className="user-container">
                    <div className="header-user management-actions">

                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Buscar usuarios..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyPress}
                                className="search-input"
                            />
                        </div>
                        <button className="btn-primary" onClick={handleAddUser}>
                            <i className="icon-plus"></i> Nuevo Usuario
                        </button>
                    </div>

                    <div className="main-user">
                        <Box sx={{ height: 520, width: '100%' }}>
                            <DataGridControl
                                rowId={'usuarioId'}
                                rows={users}
                                columns={columns}
                                onChangePage={onChangePage}
                                totalItems={totalItems}
                                pageSize={pageSize}
                                pageIndex={pageIndex}
                                fileExcelName={'Usuarios'}
                            />
                        </Box>
                    </div>
                </div>
            ) : (
                <UserForm user={currentUser} onSave={handleSaveUser} onCancel={() => setShowUserForm(false)} roles={roles} />
            )}
        </div>
    )
}

function UserForm({ user, onSave, onCancel, roles }) {
    const [formData, setFormData] = useState({
        usuarioId: user ? user.usuarioId : '',
        nombre: user ? user.nombre : "",
        apellido: user ? user.apellido : "",
        password: "",
        rolId: user ? user.rolId : "",
        activo: user ? user.activo : true,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div className="form-container">
            <h2>{user ? "Editar Usuario" : "Nuevo Usuario"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="usuario">Usuario Id</label>
                    <input
                        type="text"
                        readOnly={!!user}
                        id="usuarioId"
                        name="usuarioId"
                        value={formData.usuarioId}
                        onChange={handleChange} required
                        className="search-input"
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="search-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="apellido">Apellido</label>
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña {user && "(Dejar en blanco para mantener la actual)"}</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={!user}
                        size="small"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Rol</label>
                    <select id="rolId" name="rolId" value={formData.rolId} onChange={handleChange} required>
                        {roles.map((role, index) => (
                            <option key={index} value={role.rolId}>
                                <>{role.rolId}</>
                                <> - {role.descripcion}</>
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="activo">Estado</label>
                    <input type="checkbox" id="activo" name="activo" className="checkbox-container" checked={formData.activo} onChange={handleChange} />
                    <span>{formData.activo ? "Activo" : "Inactivo"}</span>
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                        {user ? "Actualizar" : "Crear"} Usuario
                    </button>
                </div>
            </form>
        </div>
    )
}

