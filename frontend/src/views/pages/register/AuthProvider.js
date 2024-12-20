// AuthContext.js
import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [userDetails, setUser] = useState({email: '', id: 0, role: '', fullName: '', image: null, staffId: null, position: '', branchCode: ''});

  useEffect(() => {
    const savedUser = localStorage.getItem('userDetails');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse user details:', error);
      }
    }
  }, []);

  const login = (email, id, role, fullName, image, staffId, position, branchCode) => {
    const userData = { email, id, role, fullName, image, staffId, position, branchCode };
    setUser(userData);
    localStorage.setItem('userDetails', JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser({ email: '', id: 0, role: '', fullName: '', image: null, staffId: null, position: '', branchCode: '' });
    localStorage.removeItem('userDetails');
  };

  return (
    <AuthContext.Provider value={{ userDetails, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
