import React from 'react';
import {
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    Chip
} from '@mui/material';

const mockRoles = [
    { 
        id: 1, 
        name: 'Superadmin', 
        permissions: ['all'],
        usersCount: 1
    },
    { 
        id: 2, 
        name: 'Admin', 
        permissions: ['manage_users', 'manage_invoices'],
        usersCount: 3
    },
    { 
        id: 3, 
        name: 'Staff', 
        permissions: ['view_invoices'],
        usersCount: 5
    },
    { 
        id: 4, 
        name: 'User', 
        permissions: ['view_account'],
        usersCount: 15
    }
];

const Roles: React.FC = () => {
    return (
        <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5">
                    Gestión de Roles
                </Typography>
                <Button variant="contained" color="primary">
                    Nuevo Rol
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rol</TableCell>
                            <TableCell>Permisos</TableCell>
                            <TableCell align="center">Usuarios</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockRoles.map((role) => (
                            <TableRow key={role.id}>
                                <TableCell>
                                    <Typography variant="subtitle1">
                                        {role.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {role.permissions.map((permission, index) => (
                                            <Chip
                                                key={index}
                                                label={permission}
                                                size="small"
                                                color="info"
                                                variant="outlined"
                                            />
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={role.usersCount}
                                        color="primary"
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                            disabled={role.name === 'Superadmin'}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="error"
                                            disabled={role.name === 'Superadmin'}
                                        >
                                            Eliminar
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Roles;
