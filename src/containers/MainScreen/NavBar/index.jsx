import { useNavigate } from 'react-router-dom';
import './styleNavBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { unRegisterScreen } from '../screenSlicer';
import { logout } from '../../../features/authSlice';
import { useState } from 'react';
import { UserProfile } from './UserProfile';
import useSessionLog from '../../../components/SesionLog/useSessionTracker';
export const NavBar = () => {
    const { user } = useSelector(state => state.auth)
    const { screen } = useSelector(state => state.screen)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { endSession } = useSessionLog();


    const handleGoToMenu = () => {
        navigate('/')
        dispatch(unRegisterScreen());
    }

    const handleLogout = () => {
        endSession();
        dispatch(logout());
        navigate('login')
    };

    const handleOpenModal = () => {
        setOpenModal(true);

    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSavePassword = (newPassword) => {
        console.log("Nueva contraseña:", newPassword);
        // Aquí puedes hacer la llamada a la API para actualizar la contraseña
    };

    return (
        <div className="admin-navbar">
            <div className="navbar-left">
                <div className="breadcrumb">
                    <div className='navbar-brand' onClick={handleGoToMenu}>
                        <span className="breadcrumb-item" >Home</span>
                    </div>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-item active">{screen}</span>
                </div>
            </div>
            <div className="navbar-right">
                <div className="navbar-user"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                >
                    <div className="user-info">
                        <span className="user-name">{user.usuarioId}</span>
                    </div>
                    <div className="user-dropdown">
                        <button className="dropdown-toggle">
                            <i className="icon-chevron-down"></i>
                        </button>
                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <a href="#" className="dropdown-item" onClick={handleOpenModal}>
                                    <i className="icon-user"></i> Mi Perfil
                                </a>
                                <a href="#" className="dropdown-item">
                                    <i className="icon-settings"></i> Configuración
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item logout-item" onClick={handleLogout}>
                                    <i className="icon-power"></i> Salir del Sistema
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <UserProfile
                open={openModal}
                handleClose={handleCloseModal}
                user={user}
                onSavePassword={handleSavePassword}
            />
        </div>
    )
}