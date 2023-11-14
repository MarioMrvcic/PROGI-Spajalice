import './Register.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Register() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event) {
        event.preventDefault()

        if (!username || !password || !name || !surname || !email) {
            alert('Please fill in all the required fields.');
            return;
          }

        const userToRegister = { username, password, name: `${name} ${surname}`, email }
        fetch('/api/registerUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userToRegister)
        }
        )
        .then(() => alert('User registered!'))
        .then(() => {navigate('/login')})
        
        
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <form className="register--form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="surname">Surname:</label>
                <input type="text" id="surname" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label> 
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default Register
