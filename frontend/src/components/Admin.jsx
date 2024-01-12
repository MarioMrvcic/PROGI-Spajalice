import { React, useState, useEffect } from "react";
import "./Admin.css";
import UserCard from "./UserCard";
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const { token, email, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/');
    }
  }, [navigate, role]);

  useEffect(() => {
    if (token) {
      fetch("/api/getUsers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
          .then((response) => response.json())
          .then((users) => setUsers(users))
          .catch((error) => console.error('Error:', error));
    }
  }, [token]);

  const deleteUser = (userEmail) => {
    if (userEmail === email) {
      alert("Ne možete obrisati sami sebe!")
      return;
    }

    fetch(`/api/deleteUser/${userEmail}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          setUsers(users.filter(user => user.email !== userEmail));
        })
        .catch((error) => console.error('Error:', error));
  };


  const filterUsers = () => {
    return users.filter((user) => {
      const fullName = (user.firstName + " " + user.lastName).toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
  };

  const filteredUsers = filterUsers();

  return (
      <div className="container">
        <input
            type="text"
            className="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Traži korisnike..."
        />

        <div>
          <h3>Ukupno korisnika: {filteredUsers.length}</h3>
        </div>

        <div className="headerRow">
          <h4>Ime korisnika</h4>
          <h4>Email korisnika</h4>
          <h4>Uloga korisnika</h4>
          <h4>Akcije</h4>
        </div>

        {filteredUsers.map((user) => (
            <UserCard
                key={user.email}
                name={user.firstName + " " + user.lastName}
                email={user.email}
                role={user.role}
                deleteUser={deleteUser}
            />
        ))}
      </div>
  );
};

export default Admin;