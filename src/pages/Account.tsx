import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import AuthService from '../services/auth.service';

const Account: React.FC = () => {
    const currentUser = AuthService.getCurrentUser()?.user;

    return (
        <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Mi Cuenta
            </Typography>
            <Box sx={{ mt: 2 }}>
                <Typography variant="body1">
                    <strong>Nombre:</strong> {currentUser?.name}
                </Typography>
                <Typography variant="body1">
                    <strong>Email:</strong> {currentUser?.email}
                </Typography>
                <Typography variant="body1">
                    <strong>Rol:</strong> {currentUser?.role}
                </Typography>
            </Box>
        </Paper>
    );
};

export default Account;
