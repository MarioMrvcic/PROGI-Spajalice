import './Header.css'
import { useNavigate, Routes, Route } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()

    function handleLogin(event) {
        event.preventDefault()
        navigate('/login')
    }

    function handleRegister(event) {
        event.preventDefault()
        navigate('/register')
    }

    function handleHome(event) {
        event.preventDefault()
        navigate('/')
    }

    return (
        <div className="Header">
            <h1>ConnectiNET</h1>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="UserButtons">
                            <button onClick={handleLogin}>Login</button>
                            <button onClick={handleRegister}>Register</button>
                        </div>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <div className="UserButtons">
                            <button onClick={handleHome}>Home</button>
                        </div>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <div className="UserButtons">
                            <button onClick={handleHome}>Home</button>
                        </div>
                    }
                />
            </Routes>
        </div>
    )
}

export default Header
