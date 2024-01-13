import './Register.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Register() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [selectedRole, setSelectedRole] = useState('')
    const [adminPassword, setAdminPassword] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()

        if (!password || !firstName || !lastName || !email || !selectedRole) {
            alert('Please fill in all the required fields and select a role.')
            return
        }

        if (selectedRole === 'ADMIN' && adminPassword !== 'AdminPass') {
            alert('Incorrect admin password. Cannot create admin profile.')
            return
        }

        const isValidEmail = await checkEmail()
        if (!isValidEmail) {
            return
        }

        const userToRegister = {
            password,
            firstName,
            lastName,
            email,
            role: selectedRole,
        }

        fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userToRegister),
        })
            .then(() => alert('User registered!'))
            .then(() => {
                navigate('/login')
            })
    }

    async function checkEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.')
            return false;
        }
        const response = await fetch(`api/getUser/${email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            alert('Email already in use. Please use a different email.');
            return false;
        }
        return true

    }

    return (
        <div className="register">
            <h1>Register</h1>
            <form className="register--form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor="surname">Surname:</label>
                <input type="text" id="surname" name="surname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={checkEmail} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="VISITOR"
                            checked={selectedRole === 'VISITOR'}
                            onChange={() => setSelectedRole('VISITOR')}
                        />
                        Visitor
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="ORGANIZER"
                            checked={selectedRole === 'ORGANIZER'}
                            onChange={() => setSelectedRole('ORGANIZER')}
                        />
                        Organizer
                    </label>
                </div>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="ADMIN"
                            checked={selectedRole === 'ADMIN'}
                            onChange={() => {
                                setSelectedRole('ADMIN')
                                setAdminPassword('') // Clear the admin password when switching to admin role
                            }}
                        />
                        Administrator
                    </label>
                </div>
                {selectedRole === 'ADMIN' && (
                    <div>
                        <label htmlFor="admin-password">Admin Password:</label>
                        <input
                            type="password"
                            id="admin-password"
                            name="admin-password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                        />
                    </div>
                )}
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default Register
