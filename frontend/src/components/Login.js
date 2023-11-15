import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'

function Login() {

    const { login } = useAuth();
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const loginSuccessful = await login(username, password);
      
            if (loginSuccessful) {
              navigate('/');
            } else {
              setError('Invalid username or password');
            }
          } catch (error) {
            setError('Invalid username or password');
          }   
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <form className="login--form">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="submit" value="Submit" onClick={handleSubmit} />
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )
}

export default Login
