import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Dashboard
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Welcome, {user?.user.name}!
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleLogout}
                    sx={{ mt: 2 }}
                >
                    Logout
                </Button>
            </Box>
        </Container>
    );
};

export default Dashboard;
