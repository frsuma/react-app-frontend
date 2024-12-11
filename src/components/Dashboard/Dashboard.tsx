import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import AuthService from '../../services/auth.service';
import { User } from '../../types/auth.types';

const SuperAdminDashboard: React.FC = () => (
    <Paper sx={{ p: 2, bgcolor: '#311b92' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Superadmin Dashboard
        </Typography>
        <Typography sx={{ color: 'white' }}>
            Welcome to the superadmin dashboard. Here you have full system access and can manage all aspects of the application.
        </Typography>
    </Paper>
);

const AdminDashboard: React.FC = () => (
    <Paper sx={{ p: 2, bgcolor: '#1a237e' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Admin Dashboard
        </Typography>
        <Typography sx={{ color: 'white' }}>
            Welcome to the admin dashboard. Here you can manage users and system settings.
        </Typography>
    </Paper>
);

const StaffDashboard: React.FC = () => (
    <Paper sx={{ p: 2, bgcolor: '#0d47a1' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Staff Dashboard
        </Typography>
        <Typography sx={{ color: 'white' }}>
            Welcome to the staff dashboard. Here you can manage daily operations and assist users.
        </Typography>
    </Paper>
);

const UserDashboard: React.FC = () => (
    <Paper sx={{ p: 2, bgcolor: '#1565c0' }}>
        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            User Dashboard
        </Typography>
        <Typography sx={{ color: 'white' }}>
            Welcome to your dashboard. View your profile and access available features here.
        </Typography>
    </Paper>
);

const Dashboard: React.FC = () => {
    const currentUser = AuthService.getCurrentUser()?.user as User;

    const renderDashboardByRole = () => {
        switch (currentUser.role) {
            case 'Superadmin':
                return <SuperAdminDashboard />;
            case 'Admin':
                return <AdminDashboard />;
            case 'Staff':
                return <StaffDashboard />;
            case 'User':
                return <UserDashboard />;
            default:
                return <Typography>Access Denied</Typography>;
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" gutterBottom>
                            Welcome, {currentUser.name}!
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Role: {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {renderDashboardByRole()}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
