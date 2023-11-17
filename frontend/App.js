import { Routes, Route } from 'react-router-dom'
import './src/App.css'
import Header from './src/components/Header'
import Main from './src/components/Main'
import Login from './src/components/Login'
import Register from './src/components/Register'

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
}

export default App
