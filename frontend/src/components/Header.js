import './Header.css'
import { useNavigate, Routes, Route, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DropdownMenu from './DropdownMenu'
import { useEffect, useState } from 'react'

function Header() {
    const navigate = useNavigate()
    const { email, logout, token, name, role } = useAuth()
    const [isDropdownVisible, setDropdownVisible] = useState(false)

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

    const handleMouseEnter = () => {
        setDropdownVisible(true)
    }

    const handleMouseLeave = () => {
        setDropdownVisible(false)
    }

    return (
        <div className="Header">
            <Link to="/">
                <h1>ConnectiNET</h1>
            </Link>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <div className="UserButtons">
                                {token != null ? (
                                    <>
                                        <div className="menu" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                            <button>{name}</button>
                                            {isDropdownVisible && <DropdownMenu />}
                                        </div>
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

                <Route
                    path="/profile/:encodedEmail"
                    element={
                        <div className="UserButtons">
                            <button onClick={handleHome}>Home</button>
                        </div>
                    }
                />
                <Route
                    path="/profile/public/:encodedEmail"
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
