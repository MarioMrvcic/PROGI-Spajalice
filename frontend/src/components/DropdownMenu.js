import React from "react";
import { useAuth } from '../context/AuthContext'
import { useNavigate, Routes, Route } from 'react-router-dom'


const DropdownMenu = () => {
    const { email, logout, token, name, role } = useAuth()
    const navigate = useNavigate()
    
    function handleEventManagement(event) {
        event.preventDefault()
        navigate('/manage_event')
    }

    return (
        <div className="dropdown-menu">
        <ul>
            <li className="firstLi">Profile</li>
            {(role == "ORGANIZER" || role == "ADMIN") && (
                <li onClick={handleEventManagement}>Create Event</li>
            )}
            <li onClick={logout}>Logout</li>
        </ul>
        </div>
    );
};

export default DropdownMenu;