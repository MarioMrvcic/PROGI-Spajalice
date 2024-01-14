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
                    .then((response) => {
                        if (!response.ok) {
                            // If the response is not successful, handle the error
                            throw new Error(`Error fetching user data for eventCreator ${event.eventCreator}`);
                        }
                        return response.json();
                    })
                    .then((user) => {
                        // Store the fullName in the eventCreators object
                        return { ...event, fullName: user.firstName + " " + user.lastName };
                    })
                    .catch((error) => {
                        console.error(error);
                        return null;
                    });
                });
    
                // Wait for all promises to resolve
                Promise.all(promises).then((eventsWithCreators) => {
                    // Filter out the events with null (error in fetching user data)
                    const validEventsWithCreators = eventsWithCreators.filter(Boolean);
                    
                    setEvents(validEventsWithCreators);
                    const creators = {};
                    validEventsWithCreators.forEach(event => {
                        creators[event.eventCreator] = event.fullName;
                    });
                    setEventCreators(creators);
                });
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
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
                    eventCreatorEmail={event.eventCreator}
                />
            ))}
        </div>
    );
}

export default Main;
