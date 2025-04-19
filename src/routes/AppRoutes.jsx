import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { TemplateRouter } from '../containers/MainScreen/TemplateRouter';

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={
                <PublicRoute>
                    <Login />
                </PublicRoute>
            } />

            <Route path="/*" element={
                <PrivateRoute>
                    <TemplateRouter />
                </PrivateRoute>
            } />
        </Routes>
    );
};

