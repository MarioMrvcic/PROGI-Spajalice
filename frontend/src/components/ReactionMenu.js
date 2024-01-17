import React from "react";
import { useAuth } from '../context/AuthContext'
import { useNavigate, Routes, Route } from 'react-router-dom'
import {useState, useEffect} from 'react'
import EventCard from "./EventCard";

const ReactionMenu = ({setResponse,eventId}) => {
    const { email, logout, token, name, role } = useAuth()
    const navigate = useNavigate()

    function handleYes(event){
        if(token == null){
            navigate("/login")
        }
        setResponse("Dolazim")

        fetch("/api/changeInterest",{
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            } ,
            body: JSON.stringify({
                userEmail: email,
                eventId: eventId,
                interest: "YES"
            })
        })
            .then(response=>{
                if(!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }
                return response.json()
            })
            .then(data=>{
                console.log("Change Interest successful:", data);
                alert("Interest changed successfully")
            })
            .catch(e=>{
                console.log("Change Interest error:", e);
                alert("Interest change failed")
            })

    }

    function handleMaybe(event) {
        event.preventDefault()
        if(token == null){
            navigate("/login")
        }
        setResponse("Možda dolazim")
        fetch("/api/changeInterest",{
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            } ,
            body: JSON.stringify({
                userEmail: email,
                eventId: eventId,
                interest: "MAYBE"
            })
        })
            .then(response=>{
                if(!response.ok){
                    throw new Error("HTTP error! Status: ${response.status}")
                }
                return response.json()
            })
            .then(data=>{
                console.log("Change Interest successful:", data);
                alert("Interest changed successfully")
            })
            .catch(e=>{
                console.log("Change Interest error:", e);
                alert("Interest change failed")
            })
        
    }

    function handleNo(event) {
        event.preventDefault()
        if(token == null){
            navigate("/login")
        }
        setResponse("Ne dolazim")
        fetch("/api/changeInterest",{
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`,
            } ,
            body: JSON.stringify({
                userEmail: email,
                eventId: eventId,
                interest: "NO"
            })
        })
            .then(response=>{
                if(!response.ok){
                    throw new Error("HTTP error! Status: ${response.status}")
                }
                return response.json()
            })
            .then(data=>{
                console.log("Change Interest successful:", data);
                alert("Interest changed successfully")
            })
            .catch(e=>{
                console.log("Change Interest error:", e);
                alert("Interest change failed")
            })
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