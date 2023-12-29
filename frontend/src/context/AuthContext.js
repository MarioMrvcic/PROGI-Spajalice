import React, { createContext, useContext, useState } from 'react'
import { useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState('')
    const [token, setToken] = useState(null)
    const [name, setName] = useState('')

    useEffect(() => {
        const storedAuthState = localStorage.getItem('authState')
        if (storedAuthState) {
            const { email: storedEmail, token: storedToken,name:storedName } = JSON.parse(storedAuthState)
            setEmail(storedEmail)
            setToken(storedToken)
            setName(storedName)
        }
    }, [])

    const login = async (email, password) => {
        try {
            const response = await fetch('/api/auth/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            if (response.ok) {
                const responseData = await response.json()
                const receivedName = responseData.name
                const receivedToken = responseData.token


                setToken(receivedToken)
                setEmail(email)
                setName(receivedName)

                localStorage.setItem('authState', JSON.stringify({ email, token: receivedToken, name: receivedName }))
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
        setEmail('')
        setToken(null)
        setName('')
        localStorage.removeItem('authState')
    }

    return <AuthContext.Provider value={{ email, token, name, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}
