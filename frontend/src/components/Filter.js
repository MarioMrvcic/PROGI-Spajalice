import './Filter.css'
import { React, useState, useEffect } from "react";

function Filter({ onEventsChange }){
    const [events, setEvents] = useState([]);
    const [eventCreators, setEventCreators] = useState({});
    const handleFetchUser = (event) => {
        if (event.eventCreator != null) {
          return fetch(`api/getUser/${event.eventCreator}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(
                  `Error fetching user data for eventCreator ${event.eventCreator}`
                );
              }
              return response.json();
            })
            .then((user) => {
              return { ...event, fullName: user.firstName + " " + user.lastName };
            })
            .catch((error) => {
              return null;
            });
        }
      };
    
      const handleFilter = async (url) => {
        try {
          const response = await fetch(url);
          const events = await response.json();
    
          const promises = events.map((event) => handleFetchUser(event));
    
          const eventsWithCreators = await Promise.all(promises);
    
          const validEventsWithCreators = eventsWithCreators.filter(Boolean);
    
          setEvents(validEventsWithCreators);
    
          const creators = {};
          validEventsWithCreators.forEach((event) => {
            creators[event.eventCreator] = event.fullName;
          });
    
          setEventCreators(creators);
          onEventsChange(validEventsWithCreators, creators);
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      };
    
      const handle24h = () => {
        handleFilter("/api/Events/next24hours");
      };
    
      const handle7 = () => {
        handleFilter("/api/Events/next7days");
      };
    
      const handle30 = () => {
        handleFilter("/api/Events/next30days");
      };
      
      const handleAll = () => {
        handleFilter("/api/getEvents");
      }

    return(
        <div className='containerFilter'>
            <button className="filterButton" onClick={handle24h}>24h</button>
            <button className="filterButton" onClick={handle7}>7 days</button>
            <button className="filterButton" onClick={handle30}>30 days</button>
            <button className="filterButton" onClick={handleAll}>All Events</button>
        </div>
    )
}

export default Filter