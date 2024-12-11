import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Account from '../pages/Account';
import Invoices from '../pages/Invoices';
import Users from '../pages/Users';
import Roles from '../pages/Roles';
import RoleGuard from '../components/Guards/RoleGuard';
import Login from '../components/Login';
import AuthService from '../services/auth.service';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const auth = AuthService.getCurrentUser();
    return auth ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            {/* Ruta pública */}
            <Route path="/login" element={<Login />} />
            
            {/* Rutas protegidas dentro del DashboardLayout */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <DashboardLayout />
                    </PrivateRoute>
                }
            >
                {/* Redirección por defecto */}
                <Route index element={<Navigate to="/dashboard/account" />} />
                
                {/* Rutas del dashboard */}
                <Route path="dashboard">
                    <Route
                        path="account"
                        element={
                            <RoleGuard allowedRoles={['Superadmin', 'Admin', 'Staff', 'User']}>
                                <Account />
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="invoices"
                        element={
                            <RoleGuard allowedRoles={['Superadmin', 'Admin', 'Staff']}>
                                <Invoices />
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="users"
                        element={
                            <RoleGuard allowedRoles={['Superadmin', 'Admin']}>
                                <Users />
                            </RoleGuard>
                        }
                    />
                    <Route
                        path="roles"
                        element={
                            <RoleGuard allowedRoles={['Superadmin']}>
                                <Roles />
                            </RoleGuard>
                        }
                    />
                </Route>
            </Route>

            {/* Capturar rutas no definidas */}
            <Route path="*" element={<Navigate to="/dashboard/account" replace />} />
        </Routes>
    );
};

export default AppRoutes;
