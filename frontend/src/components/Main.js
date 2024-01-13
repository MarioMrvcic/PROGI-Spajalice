import "./Main.css";
import EventCard from "./EventCard";
import { React, useState, useEffect } from "react";

function Main() {
    const [events, setEvents] = useState([]);
    const [eventCreators, setEventCreators] = useState({});
  
    useEffect(() => {
      fetch("/api/getEvents")
          .then((data) => data.json())
          .then((events) => {
              const promises = events.map((event) => {
                  return fetch(`api/getUser/${event.eventCreator}`, {
                      method: "GET",
                      headers: { "Content-Type": "application/json" },
                  })
                  .then((response) => response.json())
                  .then((user) => {
                      // Store the fullName in the eventCreators object
                      console.log(user);
                      return { ...event, fullName: user.firstName + " " + user.lastName };
                  });
              });
  
              // Wait for all promises to resolve
              Promise.all(promises).then((eventsWithCreators) => {
                  setEvents(eventsWithCreators);
                  const creators = {};
                  eventsWithCreators.forEach(event => {
                      creators[event.eventCreator] = event.fullName;
                  });
                  setEventCreators(creators);
              });
          });
  }, []);

  return (
    <div className="Main">
      {events.map((event) => (
        <EventCard
          key={event._id}
          eventName={event.eventName}
          eventType={event.eventType}
          eventDate={event.eventDate}
          eventStartTime={event.eventStartTime}
          eventDuration={event.eventDuration}
          eventDescription={event.eventDescription}
          eventCreator={eventCreators[event.eventCreator]}
        />
      ))}
    </div>
  );
}

export default Main;
