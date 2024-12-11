import axios from 'axios';
import { AuthResponse, LoginCredentials, User } from '../types/auth.types';

const API_URL = 'http://api-test-react.test/api';

// Configuración global de axios
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Interceptor para manejar errores de autenticación
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expirado o inválido
            localStorage.removeItem('user');
            delete axios.defaults.headers.common['Authorization'];
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await axios.post<AuthResponse>(
                `${API_URL}/login`,
                credentials
            );
            
            if (response.data.token && response.data.user) {
                // Verificar que el usuario tiene un rol
                if (!response.data.user.role) {
                    console.error('User data missing role:', response.data.user);
                    throw new Error('User role not found');
                }

                console.log('Login successful:', response.data); // Debug
                localStorage.setItem('user', JSON.stringify(response.data));
                this.setAuthHeader(response.data.token);
            }
            
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async register(credentials: LoginCredentials): Promise<AuthResponse> {
        try {
            const response = await axios.post<AuthResponse>(
                `${API_URL}/register`,
                credentials
            );

            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                this.setAuthHeader(response.data.token);
            }

            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        try {
            const token = this.getCurrentUser()?.token;
            if (token) {
                this.setAuthHeader(token);
                await axios.post(`${API_URL}/logout`);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('user');
            this.removeAuthHeader();
        }
    }

    getCurrentUser(): { user: User; token: string } | null {
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const userData = JSON.parse(userStr);
                console.log('Current user data:', userData); // Debug
                
                // Verificar que los datos del usuario son válidos
                if (!userData.token || !userData.user || !userData.user.role) {
                    console.error('Invalid user data in localStorage:', userData);
                    this.logout(); // Limpiar datos inválidos
                    return null;
                }
                
                return userData;
            }
        } catch (error) {
            console.error('Error getting current user:', error);
            this.logout(); // Limpiar datos si hay error
        }
        return null;
    }

    setAuthHeader(token: string): void {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            console.log('Auth header set:', token); // Debug
        }
    }

    removeAuthHeader(): void {
        delete axios.defaults.headers.common['Authorization'];
        console.log('Auth header removed'); // Debug
    }

    isAuthenticated(): boolean {
        const userData = this.getCurrentUser();
        const isAuth = !!userData?.token && !!userData?.user?.role;
        console.log('Is authenticated:', isAuth); // Debug
        return isAuth;
    }

    initializeAuth(): void {
        const user = this.getCurrentUser();
        if (user?.token) {
            this.setAuthHeader(user.token);
        }
    }
}

export default new AuthService();
