import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState('')
    const [token, setToken] = useState(null)

    useEffect(() => {
        const storedAuthState = localStorage.getItem('authState')
        if (storedAuthState) {
            const { username: storedUsername, token: storedToken } = JSON.parse(storedAuthState)
            setUsername(storedUsername)
            setToken(storedToken)
        }
    }, [])

    const login = async (username, password) => {
        try {
            const response = await fetch('/api/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }),
            })
            if (response.ok) {
                const responseData = await response.json()
                const receivedToken = responseData.token
                setToken(receivedToken)
                setUsername(username)

                localStorage.setItem('authState', JSON.stringify({ username, token: receivedToken }))
                return true
            } else {
                console.error('Login failed:', response.statusText)
                return false
            }
        } catch (error) {
            console.error('Error during login:', error)
            return false
        }
    }

    const logout = () => {
        setUsername('')
        setToken(null)
        localStorage.removeItem('authState')
    }

    return <AuthContext.Provider value={{ username, token, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
