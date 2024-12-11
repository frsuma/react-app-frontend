import { Role } from './auth.types';

export interface MenuItem {
    title: string;
    path: string;
    icon: string;
    allowedRoles: Role[];
}

export const menuItems: MenuItem[] = [
    {
        title: 'Mi Cuenta',
        path: '/dashboard/account',
        icon: 'person',
        allowedRoles: ['Superadmin', 'Admin', 'Staff', 'User']
    },
    {
        title: 'Facturas',
        path: '/dashboard/invoices',
        icon: 'receipt',
        allowedRoles: ['Superadmin', 'Admin', 'Staff']
    },
    {
        title: 'Usuarios',
        path: '/dashboard/users',
        icon: 'group',
        allowedRoles: ['Superadmin', 'Admin']
    },
    {
        title: 'Gestión de Roles',
        path: '/dashboard/roles',
        icon: 'admin_panel_settings',
        allowedRoles: ['Superadmin']
    }
];
