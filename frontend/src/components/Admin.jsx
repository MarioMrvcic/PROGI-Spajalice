import { React, useState, useEffect } from "react";
import "./Admin.css";
import UserCard from "./UserCard";
import { useAuth } from "../context/AuthContext"

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    fetch("/api/getUsers", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.json())
    .then((users) => setUsers(users))
    .catch((error) => console.error('Error:', error));
  }, [token]);

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
        />
      ))}
    </div>
  );
};

export default Admin;