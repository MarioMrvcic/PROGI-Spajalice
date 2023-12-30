import { useNavigate } from "react-router-dom";
import "./ManageEvent.css";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function ManageEvent() {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventTypes, setEventTypes] = useState([]);
  const [eventType, setEventType] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventDuration, setEventDuration] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const { token } = useAuth();

  function setMinDate() {
    var today = new Date().toISOString().split("T")[0];
    document.getElementsByName("eventDate")[0].setAttribute("min", today);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !eventName ||
      !eventDate ||
      !eventStartTime ||
      !eventDuration ||
      !eventDescription
    ) {
      alert("Please fill in all the fields");
      return;
    }

    const eventToCreate = {
      eventName,
      eventType,
      eventDate,
      eventStartTime,
      eventDuration,
      eventDescription,
    };

    fetch("/api/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventToCreate),
    })
      .then(() => alert("Event added!"))
      .then(() => {
        navigate("/");
      });
    console.log(eventToCreate);
  }

  useEffect(() => {
    setMinDate();
  }, []);

  useEffect(() => {
    fetch("/api/eventTypes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setEventTypes(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="manageEvent">
      <h1>Manage Event</h1>
      <form className="manageEvent--form">
        <label htmlFor="eventName">Event name:</label>
        <input
          type="text"
          id="eventName"
          name="eventName"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <label htmlFor="eventType">Event type:</label>
        <select
          id="eventType"
          name="eventType"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
        >
          {eventTypes.map((eventType, index) => (
            <option key={index} value={eventType}>
              {eventType}
            </option>
          ))}
        </select>
        <label htmlFor="eventDate">Event date:</label>
        <input
          type="date"
          id="eventDate"
          name="eventDate"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
        />
        <label htmlFor="eventStartTime">Event start time:</label>
        <input
          type="time"
          id="eventStartTime"
          name="eventStartTime"
          value={eventStartTime}
          onChange={(e) => setEventStartTime(e.target.value)}
        />
        <label htmlFor="eventDuration">Event duration:</label>
        <input
          type="time"
          id="eventDuration"
          name="eventDuration"
          value={eventDuration}
          onChange={(e) => setEventDuration(e.target.value)}
        />
        <label htmlFor="eventDescription">Event description:</label>
        <textarea
          type="text"
          id="eventDescription"
          name="eventDescription"
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
        />
        <input type="submit" value="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}

export default ManageEvent;
