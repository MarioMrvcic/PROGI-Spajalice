import './Main.css'
import EventCard from './EventCard'
import {React, useState, useEffect} from 'react'

function Main(){
    const [events, setEvents] = useState([]);
    useEffect(() => {
        fetch('/api/getEvents') 
        .then(data => data.json())
        .then(events => setEvents(events));
    }, []);

    return(
        
        <div className="Main">
            {
                events.map(event =>
                    <EventCard
                        key={event.id}
                        eventName={event.eventName}
                        eventType={event.eventType}
                        eventDate={event.eventDate}
                        eventStartTime={event.eventStartTime}
                        eventLocation={event.eventLocation}
                        eventDuration={event.eventDuration}
                    />
                    )
                    
            }
            
        
        </div>
    )

}

export default Main;

{/* <EventCard
                eventName="Festival glazbe"
                eventType="Glazba"
                eventDate="2023-12-16"
                eventStartTime="20:30"
                eventLocation="Lisinski"
                eventDuration="2 h, 30 min" 
            />
            <EventCard
                eventName="Food Truck"
                eventType="Glazba"
                eventDate="2023-12-16"
                eventStartTime="20:30"
                eventLocation="Lisinski"
                eventDuration="2 h, 30 min" 
            /> */}