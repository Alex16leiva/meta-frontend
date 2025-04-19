import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { Container, LoginCard, Title, Subtitle, Input, Button } from './LoginStyles';
import { ToastNotificationService } from '../components/Controls/Notification/Notification';
import { restClient } from '../services/restClient';

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!userName || !password) return ToastNotificationService.Warn('Please enter a valid username');
        const lastPath = localStorage.getItem('lastPath') || '/';

        restClient.GetTokenAuthentication('user/login', { userName, password }).then(
            response => {

                if (!response.usuarioAutenticado) {
                    return;
                }


                sessionStorage.access_token = response.token;
                const requestUserInfo = {
                    usuarioId: userName,
                }
                sessionStorage.usuarioId = userName;
                sessionStorage.requestUserInfo = JSON.stringify(requestUserInfo);
                dispatch(login(response));
                navigate(lastPath, { replace: true });
            }
        );
    };

    return (
        <Container>
            <LoginCard>
                <Title>Iniciar Sesión</Title>
                <Subtitle>Ingresa tus credenciales para continuar</Subtitle>
                <form onSubmit={handleLogin}>
                    <label>Usuario</label>
                    <Input
                        type="text"
                        placeholder="Ingresa tu usuario"
                        required
                        value={userName}
                        name='userName'
                        onChange={(e) => setUserName(e.target.value)}
                        autoComplete="user"
                    />

                    <label>Contraseña</label>
                    <Input
                        type="password"
                        placeholder="Tu contraseña"
                        required
                        value={password}
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />

                    <Button type="submit">Iniciar Sesión</Button>
                </form>
            </LoginCard>
        </Container>
    );
};

export default Login;
