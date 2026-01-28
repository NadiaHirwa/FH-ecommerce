import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type UserRole = 'customer' | 'employee' | 'admin';

interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  isVerified: boolean;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  sendResetLink: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  verifyEmail: (otp: string) => Promise<void>;
  resendOTP: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Load user from localStorage if available
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string) => {
    // Mock login - replace with real API call
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Determine role based on email for demo purposes
    let role: UserRole = 'customer';
    if (email.includes('employee')) role = 'employee';
    if (email.includes('admin')) role = 'admin';

    const mockUser: User = {
      id: '1',
      email,
      name: email.includes('admin') ? 'Admin User' : email.includes('employee') ? 'John Employee' : 'John Doe',
      isVerified: true,
      role,
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const register = async (name: string, email: string, phone: string, password: string) => {
    // Mock registration - replace with real API call
    if (!name || !email || !phone || !password) {
      throw new Error('All fields are required');
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      phone,
      name,
      isVerified: false,
      role: 'customer',
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const sendResetLink = async (email: string) => {
    // Mock reset link send - replace with real API call
    if (!email) {
      throw new Error('Email is required');
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const resetPassword = async (token: string, newPassword: string) => {
    // Mock password reset - replace with real API call
    if (!token || !newPassword) {
      throw new Error('Token and new password are required');
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  const verifyEmail = async (otp: string) => {
    // Mock email verification - replace with real API call
    if (!otp || otp.length !== 6) {
      throw new Error('OTP must be 6 digits');
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (user) {
      const verifiedUser = { ...user, isVerified: true };
      setUser(verifiedUser);
      localStorage.setItem('user', JSON.stringify(verifiedUser));
    }
  };

  const resendOTP = async () => {
    // Mock resend OTP - replace with real API call
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        register,
        logout,
        sendResetLink,
        resetPassword,
        verifyEmail,
        resendOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
