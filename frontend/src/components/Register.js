import './Register.css'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        navigate('/')
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <form className="register--form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="surname">Surname:</label>
                <input type="text" id="surname" name="surname" />
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="password">Password:</label> 
                <input type="password" id="password" name="password" />
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default Register
