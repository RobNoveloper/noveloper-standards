import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { apiClient } from './api-client';

/**
 * Standard Noveloper Authentication Context
 * 
 * This template provides a standardized approach to authentication
 * with built-in user management, token handling, and authorization.
 */

export interface User {
  id: number;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  role: 'admin' | 'user' | 'guest';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: SignupData) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  clearError: () => void;
}

interface SignupData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedToken = localStorage.getItem('auth_token');
      
      if (storedToken) {
        try {
          // Set token in API client for authenticated requests
          apiClient.setToken(storedToken);
          setToken(storedToken);
          
          // Fetch user data
          const response = await apiClient.get<User>('/api/auth/me');
          
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            // Token invalid or expired
            handleLogout();
          }
        } catch (error) {
          console.error('Authentication status check failed:', error);
          handleLogout();
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuthStatus();
  }, []);
  
  // Handle login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post<{ token: string; user: User }>('/api/auth/login', {
        email,
        password,
      });
      
      if (response.success && response.data) {
        const { token, user } = response.data;
        
        // Save token and set user
        localStorage.setItem('auth_token', token);
        apiClient.setToken(token);
        setToken(token);
        setUser(user);
        
        setIsLoading(false);
        return true;
      } else {
        setError(response.message || 'Login failed');
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      setError('An unexpected error occurred during login');
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };
  
  // Handle signup
  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post<{ token: string; user: User }>('/api/auth/signup', userData);
      
      if (response.success && response.data) {
        const { token, user } = response.data;
        
        // Save token and set user
        localStorage.setItem('auth_token', token);
        apiClient.setToken(token);
        setToken(token);
        setUser(user);
        
        setIsLoading(false);
        return true;
      } else {
        setError(response.message || 'Signup failed');
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      setError('An unexpected error occurred during signup');
      console.error('Signup error:', error);
      setIsLoading(false);
      return false;
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
    // Clear token from API client
    apiClient.setToken('');
  };
  
  // Reset password
  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.post<{ success: boolean }>('/api/auth/reset-password', { email });
      
      setIsLoading(false);
      
      if (response.success) {
        return true;
      } else {
        setError(response.message || 'Password reset failed');
        return false;
      }
    } catch (error) {
      setError('An unexpected error occurred during password reset');
      console.error('Password reset error:', error);
      setIsLoading(false);
      return false;
    }
  };
  
  // Update user profile
  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    if (!user || !token) {
      setError('You must be logged in to update your profile');
      return false;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.patch<User>('/api/auth/profile', userData);
      
      if (response.success && response.data) {
        setUser(response.data);
        setIsLoading(false);
        return true;
      } else {
        setError(response.message || 'Profile update failed');
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      setError('An unexpected error occurred during profile update');
      console.error('Profile update error:', error);
      setIsLoading(false);
      return false;
    }
  };
  
  // Clear error
  const clearError = () => {
    setError(null);
  };
  
  // Create the context value
  const contextValue: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    signup,
    logout: handleLogout,
    resetPassword,
    updateUser,
    clearError,
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for using the auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Higher-order component to protect routes
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> {
  return (props: P) => {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
      // Redirect to login or show unauthorized message
      return (
        <div className="flex items-center justify-center min-h-screen bg-red-50">
          <div className="text-center p-6 bg-white rounded-lg shadow-md border border-red-200">
            <h2 className="text-2xl font-semibold text-red-600 mb-2">
              Unauthorized Access
            </h2>
            <p className="text-gray-600 mb-4">
              You need to be logged in to view this page.
            </p>
            <a
              href="/login"
              className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Go to Login
            </a>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}