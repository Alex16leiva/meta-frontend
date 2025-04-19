"use client"

import { useCallback, useEffect, useState } from "react"
import { restClient } from "../../services/restClient"
import { utilsValidator } from "../../Helpers/utils/utilsValidator"
import { ToastNotificationService } from "../../components/Controls/Notification/Notification"

export default function PermissionManagement() {
    const [screens, setScreen] = useState([])
    const [roles, setRoles] = useState([])
    const [permissions, setPermissions] = useState([])
    const [selectedRoleId, setSelectedRoleId] = useState('')

    const fetchPantallas = useCallback(async () => {
        restClient.httpGet('user/obtener-pantalla', {})
            .then(response => {
                setScreen(response);
            })
    }, [])

    useEffect(() => {
        fetchPantallas();
    }, [fetchPantallas])

    const fetchRoles = useCallback(async () => {
        restClient.httpGet('user/obtener-roles', {})
            .then(response => {
                setRoles(response);
            })
    }, [])

    useEffect(() => {
        fetchRoles()
    }, [fetchRoles])

    useEffect(() => {
        if (roles.length > 0 && !selectedRoleId) {
            setSelectedRoleId(roles[0].rolId);
            const role = roles.find(r => r.rolId === selectedRoleId);
            setPermissions(role?.permisos || []);
            console.log(role);

        }
    }, [roles]);


    const handlePermissionChange = (pantallaId, permType, value) => {
        setPermissions(prevPermissions => {
            const existingPermissionIndex = prevPermissions.findIndex(
                (p) => p.rolId === selectedRoleId && p.pantallaId === pantallaId
            );

            if (existingPermissionIndex >= 0) {
                const updatedPermissions = [...prevPermissions];
                updatedPermissions[existingPermissionIndex] = {
                    ...updatedPermissions[existingPermissionIndex],
                    [permType]: value,
                };
                return updatedPermissions;
            } else {
                return [
                    ...prevPermissions,
                    {
                        rolId: selectedRoleId,
                        pantallaId,
                        ver: permType === "ver" ? value : false,
                        editar: permType === "editar" ? value : false,
                        eliminar: permType === "eliminar" ? value : false,
                    },
                ];
            }
        });
    };



    const getPermission = (screenId) => {
        return (
            permissions.find((p) => p.rolId === selectedRoleId && p.pantallaId === screenId) || {
                ver: false,
                editar: false,
                eliminar: false,
            }
        )
    }

    useEffect(() => {
        if (selectedRoleId) {
            const role = roles.find(r => r.rolId === selectedRoleId);
            setPermissions(role?.permisos || []);
        }
    }, [selectedRoleId, roles]);

    const handleRoleChange = (e) => {
        setSelectedRoleId(e.target.value);
    };


    const handleSavePermissions = () => {
        const request = {
            rolId: selectedRoleId,
            permisos: permissions
        }

        restClient.httpPost('user/edicion-permisos', request)
            .then(response => {
                if (!utilsValidator.hasErrorResponse(response)) {
                    ToastNotificationService.Success("Se editaron los permisos");
                    fetchRoles();
                }
            });
    }

    return (
        <div className="management-container">
            <div className="permission-header">
                <div className="role-selector">
                    <label htmlFor="roleSelect">Seleccionar Rol:</label>
                    <select id="roleSelect" value={selectedRoleId} onChange={handleRoleChange}>
                        {roles.map((role, index) => (
                            <option key={index} value={role.rolId}>
                                <>{role.rolId}</>
                                <> - {role.descripcion}</>
                            </option>
                        ))}
                    </select>
                </div>
                <button className="btn-primary" onClick={handleSavePermissions}>
                    Guardar Permisos
                </button>
            </div>

            <div className="table-container">
                <table className="data-table permission-table">
                    <thead>
                        <tr>
                            <th>Pantalla</th>
                            <th>Descripción</th>
                            <th>Ver</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {screens.map((screen, index) => {
                            const perm = getPermission(screen.pantallaId)
                            return (
                                <tr key={index}>
                                    <td>{screen.pantallaId}</td>
                                    <td>{screen.descripcion}</td>
                                    <td>
                                        <label className="checkbox-container">
                                            <input
                                                type="checkbox"
                                                checked={perm.ver}
                                                onChange={(e) => handlePermissionChange(screen.pantallaId, "ver", e.target.checked)}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="checkbox-container">
                                            <input
                                                type="checkbox"
                                                checked={perm.editar}
                                                disabled={!perm.ver}
                                                onChange={(e) => handlePermissionChange(screen.pantallaId, "editar", e.target.checked)}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <label className="checkbox-container">
                                            <input
                                                type="checkbox"
                                                checked={perm.eliminar}
                                                disabled={!perm.ver || !perm.editar}
                                                onChange={(e) => handlePermissionChange(screen.pantallaId, "eliminar", e.target.checked)}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

