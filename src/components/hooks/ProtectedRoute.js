import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export const ProtectedRoute = () => {
    const { cookies } = useAuth();

    return cookies.token ? <Outlet /> : <Navigate to="/login" exact />
}