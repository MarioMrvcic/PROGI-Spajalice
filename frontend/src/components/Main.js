import './Main.css'
import EventCard from './EventCard'
import { React, useState, useEffect } from 'react'

function Main() {
    const [events, setEvents] = useState([])
    useEffect(() => {
        fetch('/api/getEvents')
            .then((data) => data.json())
            .then((events) => setEvents(events))
    }, [])

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
                />
            ))}
        </div>
    )
}

export default Main
