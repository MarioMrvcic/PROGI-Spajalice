import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [Email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const loginSuccessful = await login(Email, password)

            if (loginSuccessful) {
                navigate('/')
                setIsLoading(false)
            } else {
                setError('Invalid Email or password')
                setIsLoading(false)
            }
        } catch (error) {
            setError('Invalid Email or password')
            setIsLoading(false)
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form className="login--form">
                <label htmlFor="Email">Email:</label>
                <input type="text" id="Email" name="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {isLoading ? (
                    <FontAwesomeIcon icon={faSpinner} className="iconLoadingLogin" />
                ) : (
                    <input type="submit" value="Submit" onClick={handleSubmit} />
                )}
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

export default Login
