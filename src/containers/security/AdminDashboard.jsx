"use client"

import { useState } from "react"
import "../MainScreen/NavBar/styleNavBar.css"
import UserManagement from "./UserManagement"
import RoleManagement from "./RoleManagement"
import PermissionManagement from "./PermisionManagement"

export default function UserAdminDashboard() {
    const [activeTab, setActiveTab] = useState("users")

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <nav className="admin-nav">
                    <button className={`nav-item ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
                        <i className="icon-users"></i>
                        Usuarios
                    </button>
                    <button className={`nav-item ${activeTab === "roles" ? "active" : ""}`} onClick={() => setActiveTab("roles")}>
                        <i className="icon-shield"></i>
                        Roles
                    </button>
                    <button
                        className={`nav-item ${activeTab === "permissions" ? "active" : ""}`}
                        onClick={() => setActiveTab("permissions")}
                    >
                        <i className="icon-lock"></i>
                        Permisos
                    </button>
                </nav>
            </div>

            <div className="admin-content">
                <main className="admin-main">
                    {activeTab === "users" && <UserManagement />}
                    {activeTab === "roles" && <RoleManagement />}
                    {activeTab === "permissions" && <PermissionManagement />}
                </main>
            </div>
        </div>
    )
}

