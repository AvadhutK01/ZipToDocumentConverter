import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState('');

    const login = (username) => {
        setUsername(username);
        localStorage.setItem('user  ', username);
    };

    const logout = () => {
        setUsername('');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/'
    };

    return (
        <AuthContext.Provider value={{ username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
