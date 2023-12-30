import './Header.css'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
    const navigate = useNavigate()
    const { email, logout, token ,name } = useAuth()

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

    function handleEventManagement(event) {
        event.preventDefault()
        navigate('/manage_event')
    }

    return (
        <div className="Header">
            <h1>ConnectiNET</h1>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            {token != null && <p className="WelcomeText">Welcome, {name}!</p>}
                            <div className="UserButtons">
                                {token != null ? (
                                    <>
                                        <button onClick={handleEventManagement}>Create Event</button>
                                        <button onClick={logout}>Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handleLogin}>Login</button>
                                        <button onClick={handleRegister}>Register</button>
                                    </>
                                )}
                            </div>
                        </>
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
                <Route
                    path="/manage_event"
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
