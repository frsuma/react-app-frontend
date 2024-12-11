import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Navigate } from 'react-router-dom';
import {
    Box,
    Drawer,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
    Button,
    useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { menuItems } from '../../types/menu.types';
import AuthService from '../../services/auth.service';
import { User } from '../../types/auth.types';

const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
    const [open, setOpen] = useState(true);
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Cerrar el drawer automáticamente en móvil
    useEffect(() => {
        if (isMobile) {
            setOpen(false);
        }
    }, [isMobile]);

    // Obtener datos de autenticación
    const auth = AuthService.getCurrentUser();
    console.log('Auth data:', auth); // Debug

    // Redirect to login if not authenticated
    if (!auth || !auth.user) {
        console.log('No auth data found, redirecting to login'); // Debug
        return <Navigate to="/login" />;
    }

    const currentUser = auth.user as User;
    console.log('Current user:', currentUser); // Debug
    console.log('User role:', currentUser.role); // Debug

    // Mapeo de iconos
    const iconComponents: { [key: string]: React.ComponentType } = {
        'person': PersonIcon,
        'receipt': ReceiptIcon,
        'group': GroupIcon,
        'admin_panel_settings': AdminPanelSettingsIcon,
    };

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    // Filter menu items based on user role
    const filteredMenuItems = menuItems.filter(item => {
        const hasPermission = item.allowedRoles.includes(currentUser.role);
        console.log(`Menu item "${item.title}": ${hasPermission ? 'allowed' : 'not allowed'} for role ${currentUser.role}`); // Debug
        return hasPermission;
    });

    console.log('Filtered menu items:', filteredMenuItems); // Debug

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: open ? `calc(100% - ${drawerWidth}px)` : '100%' },
                    ml: { sm: open ? `${drawerWidth}px` : 0 },
                    zIndex: theme.zIndex.drawer + 1,
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="toggle drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ 
                            mr: 2,
                            '&:hover': {
                                color: 'primary.main'
                            }
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography 
                        variant="h6" 
                        noWrap 
                        component="div" 
                        sx={{ 
                            flexGrow: 1,
                            color: 'primary.main',
                            fontWeight: 'bold'
                        }}
                    >
                        Dashboard
                    </Typography>
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: { xs: 1, sm: 2 },
                        '& .MuiTypography-body2': {
                            display: { xs: 'none', sm: 'block' },
                            color: 'white'
                        }
                    }}>
                        <Typography variant="body2">
                            {currentUser.name} ({currentUser.role})
                        </Typography>
                        <Button 
                            color="primary"
                            variant="contained"
                            onClick={handleLogout}
                            sx={{ 
                                minWidth: { xs: 'auto', sm: '64px' },
                                px: { xs: 1, sm: 2 },
                                '&:hover': {
                                    backgroundColor: 'primary.dark'
                                }
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={open}
                onClose={isMobile ? handleDrawerToggle : undefined}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        borderRight: '1px solid rgba(255, 255, 255, 0.12)',
                        ...(!open && !isMobile && {
                            width: theme.spacing(7),
                            overflowX: 'hidden',
                        }),
                        '& .MuiListItemButton-root': {
                            '&:hover': {
                                backgroundColor: 'rgba(255, 121, 0, 0.08)',
                            },
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(255, 121, 0, 0.16)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 121, 0, 0.24)',
                                },
                            },
                        },
                        '& .MuiListItemIcon-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                            minWidth: 0,
                            '&:hover': {
                                color: 'primary.main',
                            },
                        },
                        '& .MuiListItemText-root': {
                            '& .MuiTypography-root': {
                                color: 'white',
                            },
                        },
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {filteredMenuItems.map((item) => (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton
                                    onClick={() => {
                                        navigate(item.path);
                                        if (isMobile) setOpen(false);
                                    }}
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {React.createElement(iconComponents[item.icon] || PersonIcon)}
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={item.title}
                                        sx={{ 
                                            opacity: open ? 1 : 0,
                                            display: (!open && !isMobile) ? 'none' : 'block'
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 3 },
                    width: '100%',
                    height: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' },
                    overflow: 'auto',
                    mt: { xs: '56px', sm: '64px' },
                    backgroundColor: 'background.default',
                    ml: { sm: open ? `${drawerWidth}px` : theme.spacing(7) },
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default DashboardLayout;
