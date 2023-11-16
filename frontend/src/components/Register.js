import './Register.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Register() {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        if (!password || !firstName || !lastName || !email) {
            alert('Please fill in all the required fields.')
            return
        }

        const userToRegister = { password, firstName, lastName, email }
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

    return (
        <div className="register">
            <h1>Register</h1>
            <form className="register--form">
                <label htmlFor="firstName">First name:</label>
                <input type="text" id="firstName" firstName="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor="lastName">Last name:</label>
                <input type="text" id="lastName" firstName="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" firstName="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" firstName="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default Register
