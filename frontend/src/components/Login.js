import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        navigate('/')
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form className="login--form">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
                <input type="submit" value="Submit" onClick={handleSubmit} />
            </form>
        </div>
    )
}

export default Login
