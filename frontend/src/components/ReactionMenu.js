import React from "react";
import { useAuth } from '../context/AuthContext'
import { useNavigate, Routes, Route } from 'react-router-dom'
import {useState, useEffect} from 'react'
import EventCard from "./EventCard";

const ReactionMenu = ({setResponse}) => {
    const { email, logout, token, name, role } = useAuth()
    const navigate = useNavigate()

    function handleYes(event){
        if(token == null){
            navigate("/login")
        }
        setResponse("Dolazim")
    };

    function handleMaybe(event) {
        event.preventDefault()
        if(token == null){
            navigate("/login")
        }
        setResponse("Možda dolazim")
    }

    function handleNo(event) {
        event.preventDefault()
        if(token == null){
            navigate("/login")
        }
        setResponse("Ne dolazim")
    }

    return (
        <div className="dropdown-menu">
        <ul>
            <li className="firstLi" onClick={handleYes}>Dolazim</li>
            <li onClick={handleMaybe}>Možda dolazim</li>
            <li onClick={handleNo}>Ne dolazim</li>
        </ul>
        </div>
    );
};

export default ReactionMenu;