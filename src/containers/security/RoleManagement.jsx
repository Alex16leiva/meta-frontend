"use client"
import { useCallback, useEffect } from "react"
import { useState } from "react"
import { restClient } from "../../services/restClient"
import { utilsValidator } from "../../Helpers/utils/utilsValidator"
import { ToastNotificationService } from "../../components/Controls/Notification/Notification"



export default function RoleManagement() {
    const [roles, setRoles] = useState([])
    const [showRoleForm, setShowRoleForm] = useState(false)
    const [currentRole, setCurrentRole] = useState(null)

    const fetchRoles = useCallback(async () => {
        restClient.httpGet('user/obtener-roles', {})
            .then(response => {
                setRoles(response);
            })
    }, [])

    useEffect(() => {
        fetchRoles()
    }, [fetchRoles])


    const handleAddRole = () => {
        setCurrentRole(null)
        setShowRoleForm(true)
    }

    const handleEditRole = (role) => {
        setCurrentRole(role)
        setShowRoleForm(true)
    }

    const handleSaveRole = (roleData) => {
        const request = {
            rol: roleData
        }
        const url = currentRole ? 'user/editar-rol' : 'user/crear-rol'
        restClient.httpPost(url, request)
            .then(response => {
                if (!utilsValidator.hasErrorResponse(response)) {
                    setShowRoleForm(false)
                    fetchRoles();
                    const mensaje = currentRole ? "Rol Editado" : "Rol Creado"
                    ToastNotificationService.Success(mensaje)
                }
            })
    }


    return (
        <div className="management-container">
            {!showRoleForm ? (
                <>
                    <div className="management-actions">
                        <button className="btn-primary" onClick={handleAddRole}>
                            <i className="icon-plus"></i> Nuevo Rol
                        </button>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Pantallas con Acceso</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {roles.map((role, index) => (
                                    <tr key={index}>
                                        <td>{role.rolId}</td>
                                        <td>{role.descripcion}</td>
                                        <td>
                                            <div className="screen-access-list">
                                                {role.permisos.map((screenName, index) => (
                                                    <span key={index} className="badge badge-info screen-badge">
                                                        {screenName.pantallaId}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="btn-icon" onClick={() => handleEditRole(role)}>
                                                    <i className="icon-edit"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <RoleForm role={currentRole} onSave={handleSaveRole} onCancel={() => setShowRoleForm(false)} />
            )}
        </div>
    )
}

function RoleForm({ role, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        rolId: role ? role.rolId : "",
        descripcion: role ? role.descripcion : "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    return (
        <div className="form-container">
            <h2>{role ? "Editar Rol" : "Nuevo Rol"}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre del Rol</label>
                    <input type="text" id="rolId" name="rolId" value={formData.rolId} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descripción</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows={4}
                        required
                    />
                </div>

                <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                    <button type="submit" className="btn-primary">
                        {role ? "Actualizar" : "Crear"} Rol
                    </button>
                </div>
            </form>
        </div>
    )
}

