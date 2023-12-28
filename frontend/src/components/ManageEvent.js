import { useNavigate } from 'react-router-dom'
import './ManageEvent.css'
import { useEffect, useState } from 'react';

function ManageEvent(){
    const navigate = useNavigate();
    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventDuration, setEventDuration] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    function setMinDate(){
        var today = new Date().toISOString().split('T')[0];
        document.getElementsByName("eventDate")[0].setAttribute('min', today);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (!eventName || !eventType || !eventDate || !eventStartTime || !eventDuration || !eventDescription) {
            alert('Please fill in all the fields');
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
    }

    useEffect(() => {
        setMinDate();
      }, []);
    return (
        <div className="manageEvent">
            <h1>Manage Event:</h1>
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
                    <input
                        type="text"
                        id="eventType"
                        name="eventType"
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                    />
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
                    <input type="submit" value="Submit" onClick={handleSubmit}/>
            </form>
        </div>
    )
}

export default ManageEvent;