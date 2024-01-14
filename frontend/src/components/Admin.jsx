import { React, useState, useEffect } from "react";
import "./Admin.css";
import UserCard from "./UserCard";
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const { token, email, role } = useAuth();
  const [organisers, setOrganisers] = useState(0); 
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'ADMIN') {
      navigate('/');
    }
  }, [navigate, role]);

  useEffect(() => {
    if (token && organisers === 0) {
      fetch("/api/getUsers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
          .then((response) => response.json())
          .then((users) => setUsers(users))
          .catch((error) => console.error('Error:', error));
    }else if(token && organisers === 1){
      fetch("/api/organisers", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
          .then((response) => response.json())
          .then((users) => setUsers(users))
          .catch((error) => console.error('Error:', error));
    }
  }, [token, organisers]);

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

  const showorganisers = () => {
    setOrganisers(prevorganisers => prevorganisers === 0 ? 1 : 0);
  }


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

        <div className="userCountAndButton">
          <h3 className="userCount">Ukupno korisnika: {filteredUsers.length}</h3>
          <button className="organiserButton" onClick={showorganisers}>{organisers === 0 ? "Vidi organizatore" : "Vidi sve korisnike"}</button>
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