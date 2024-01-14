import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'
import Login from './components/Login'
import Register from './components/Register'
import Admin from './components/Admin'
import ManageEvent from './components/ManageEvent'
import Payment from './components/Payment'
import Profile from './components/profile/Profile'

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
                <Route path="/profile/:encodedEmail" element={<Profile />} />
                <Route path="/profile/public/:encodedEmail" element={<Profile />} />
            </Routes>
        </div>
    )
}

export default App
