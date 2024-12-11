import React from 'react';
import { Navigate } from 'react-router-dom';
import { Role } from '../../types/auth.types';
import AuthService from '../../services/auth.service';

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: Role[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles }) => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser || !currentUser.user) {
        // Not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(currentUser.user.role)) {
        // Role not authorized, redirect to home page
        return <Navigate to="/" replace />;
    }

    // Authorized, render children
    return <>{children}</>;
};

export default RoleGuard;
