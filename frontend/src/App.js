import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'
import Admin from './components/Admin'
import ManageEvent from './components/ManageEvent'

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/manage_event" element={<ManageEvent />} />
                <Route path="/payment/*" element={<Payment />} />
            </Routes>
        </div>
    )
}

export default App
