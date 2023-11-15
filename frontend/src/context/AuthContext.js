import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('');

  useEffect(() => {
    
    const storedAuthState = localStorage.getItem('authState')
    if (storedAuthState) {
      const { isAuthenticated: storedIsAuthenticated, username: storedUsername } = JSON.parse(storedAuthState)
      setIsAuthenticated(storedIsAuthenticated)
      setUsername(storedUsername)
    }
  }, [])

  const login = async (username, password) => {

    //Ovdje ove 4 linije su samo za provjeru da li radi, kada se napravi /api/login, zamjenit sa donje zakomentiranim kodom

    setIsAuthenticated(true)
    setUsername(username)
    localStorage.setItem('authState', JSON.stringify({ isAuthenticated: true, username }))
    return true
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ username, password }),
    //   })
    //   if (response.ok) {
    //     setIsAuthenticated(true)
    //     setUsername(username)
    //     localStorage.setItem('authState', JSON.stringify({ isAuthenticated: true, username }))
    //     return true
    //   } else {
    //     console.error('Login failed:', response.statusText)
    //     return false
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error)
    //   return false
    // }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUsername('')
    localStorage.removeItem('authState')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)
};
