import "./Main.css";
import EventCard from "./EventCard";
import Filter from "./Filter";
import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Main() {
  const [events, setEvents] = useState([]);
  const [eventCreators, setEventCreators] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleEventsChange = (newEvents, newEventCreators) => {
    setEvents(newEvents);
    setEventCreators(newEventCreators);
  };

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
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFilter("/api/getEvents");
  }, []);

  return (
    <div className="Main">
      <Filter onEventsChange={handleEventsChange} />
      {isLoading && (
        <FontAwesomeIcon icon={faSpinner} className="iconLoadingMain" />
      )}
      {events.map((event) => (
        <EventCard
          eventId={event._id}
          eventName={event.eventName}
          eventType={event.eventType}
          eventDate={event.eventDate}
          eventStartTime={event.eventStartTime}
          eventDuration={event.eventDuration}
          eventDescription={event.eventDescription}
          eventCreator={eventCreators[event.eventCreator]}
          eventCreatorEmail={event.eventCreator}
          eventPhotos={event.photos}
          eventPrice={event.price}
          eventLocation={event.eventLocation}
          eventReviews={event.reviews || []}
        />
      ))}
    </div>
  );
}

export default Main;
