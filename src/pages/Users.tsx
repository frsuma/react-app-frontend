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
    Chip
} from '@mui/material';

const mockUsers = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'User', status: 'Activo' },
    { id: 2, name: 'María García', email: 'maria@example.com', role: 'Staff', status: 'Activo' },
    { id: 3, name: 'Carlos López', email: 'carlos@example.com', role: 'Admin', status: 'Inactivo' },
];

const Users: React.FC = () => {
    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Gestión de Usuarios
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                sx={{ mb: 2 }}
            >
                Nuevo Usuario
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mockUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={user.role}
                                        color={
                                            user.role === 'Admin' ? 'primary' :
                                            user.role === 'Staff' ? 'info' : 'default'
                                        }
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Chip 
                                        label={user.status}
                                        color={user.status === 'Activo' ? 'success' : 'error'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button size="small" color="primary">Editar</Button>
                                    <Button size="small" color="error">Eliminar</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Users;
